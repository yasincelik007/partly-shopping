import random
from datetime import datetime, timezone
from typing import List
from .base import BaseScraper
from ..models import Offer

class AmazonScraper(BaseScraper):
  def __init__(self):
    super().__init__('amazon', rate=3, per=1)

  async def fetch(self, query: str) -> List[Offer]:
    await self.throttle()
    price = round(random.uniform(5, 50), 2)
    stock = random.randint(0, 20)
    rel = round(random.uniform(0.7, 0.99), 2)
    return [Offer(
      source='amazon',
      title=f'{query} pack',
      price=price,
      currency='USD',
      stock=stock,
      seller='Amazon Seller',
      seller_reliability=rel,
      url='https://www.amazon.com/example',
      fetched_at=datetime.now(timezone.utc)
    )]
