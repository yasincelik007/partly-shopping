import asyncio
from typing import List
from aiolimiter import AsyncLimiter
from ..models import Offer

class BaseScraper:
  def __init__(self, source: str, rate: int = 5, per: int = 1):
    self.source = source
    self.limiter = AsyncLimiter(rate, per)
    self.backoff = 0.0

  async def fetch(self, query: str) -> List[Offer]:
    raise NotImplementedError

  async def throttle(self):
    await self.limiter.acquire()
    if self.backoff > 0:
      await asyncio.sleep(self.backoff)

  def adapt(self, status_code: int):
    if status_code == 429:
      self.backoff = min(self.backoff + 0.5, 10.0)
    elif 200 <= status_code < 300:
      self.backoff = max(self.backoff * 0.5, 0.0)
