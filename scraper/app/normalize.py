from typing import List
from .models import Offer

def normalize(offers: List[Offer]) -> List[Offer]:
  return sorted(offers, key=lambda o: (o.price, -o.seller_reliability))
