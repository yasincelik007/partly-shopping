import random
from datetime import datetime, timezone
from typing import List
from .base import BaseScraper
from ..models import Offer

class EbayScraper(BaseScraper):
  def __init__(self):
    super().__init__('ebay', rate=4, per=1)

  async def fetch(self, query: str) -> List[Offer]:
    await self.throttle()
    price = round(random.uniform(4, 45), 2)
    stock = random.randint(0, 15)
    rel = round(random.uniform(0.6, 0.95), 2)
    return [Offer(
      source='ebay',
      title=f'{query} item',
      price=price,
      currency='USD',
      stock=stock,
      seller='eBay Seller',
      seller_reliability=rel,
      url='https://www.ebay.com/example',
      fetched_at=datetime.now(timezone.utc)
    )]
