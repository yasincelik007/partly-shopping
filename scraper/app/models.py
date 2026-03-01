from datetime import datetime
from pydantic import BaseModel, HttpUrl

class Offer(BaseModel):
  source: str
  title: str
  price: float
  currency: str
  stock: int
  seller: str
  seller_reliability: float
  url: HttpUrl
  fetched_at: datetime
