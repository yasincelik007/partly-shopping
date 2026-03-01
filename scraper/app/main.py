import asyncio
from datetime import datetime, timedelta, timezone
from typing import Dict, List
from fastapi import FastAPI, Query
from .models import Offer
from .sources.amazon import AmazonScraper
from .sources.ebay import EbayScraper
from .normalize import normalize

app = FastAPI()
scrapers = [AmazonScraper(), EbayScraper()]
cache: Dict[str, Dict[str, any]] = {}

async def aggregate(query: str) -> List[Offer]:
  results: List[Offer] = []
  for s in scrapers:
    results.extend(await s.fetch(query))
  return normalize(results)

async def refresh_loop():
  while True:
    keys = list(cache.keys())
    for q in keys:
      offers = await aggregate(q)
      cache[q] = {'data': offers, 'ts': datetime.now(timezone.utc)}
    await asyncio.sleep(900)

@app.on_event('startup')
async def on_start():
  asyncio.create_task(refresh_loop())

@app.get('/offers', response_model=List[Offer])
async def get_offers(q: str = Query(..., min_length=2, max_length=64)):
  now = datetime.now(timezone.utc)
  cached = cache.get(q)
  if not cached or now - cached['ts'] > timedelta(minutes=15):
    data = await aggregate(q)
    cache[q] = {'data': data, 'ts': now}
  return cache[q]['data']
