import asyncio
from app.main import aggregate

async def loop():
  queries = ['screw m6x15', 'gasket', 'bearing']
  while True:
    for q in queries:
      await aggregate(q)
    await asyncio.sleep(900)

if __name__ == '__main__':
  asyncio.run(loop())
