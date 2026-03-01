// Ducati Panigale V4 hierarchy (simplified)
MERGE (product:Product {product_id: 'ducati-v4', name: 'Ducati Panigale V4'})
MERGE (engine:Assembly {assembly_id: 'engine-block', name: 'Motor Bloğu'})
MERGE (crank:Assembly {assembly_id: 'crankshaft', name: 'Krank Mili'})
MERGE (bearing:Part {part_id: 'bearing-001', name: 'Rulman', material: 'Steel', weight: 0.35, torque_value: 0})
MERGE (screw:Part {part_id: 'screw-m6x15', name: 'Vida M6x15', material: 'Steel', weight: 0.02, torque_value: 12, oem_code: 'DUC-44321-A'})
MERGE (gasket:Part {part_id: 'gasket-001', name: 'Conta', material: 'Rubber', weight: 0.01, torque_value: 0})

MERGE (product)-[:HAS_ASSEMBLY]->(engine)
MERGE (engine)-[:HAS_ASSEMBLY]->(crank)
MERGE (crank)-[:HAS_PART]->(bearing)
MERGE (bearing)-[:HAS_PART]->(screw)
MERGE (engine)-[:HAS_PART]->(gasket)

// Relationships for recommendations
MERGE (screw)-[:RELATES_TO]->(gasket)

// Alternative example
MERGE (screwAlt:Part {part_id: 'screw-m6x15-alt', name: 'Vida M6x15 Alt', material: 'Stainless', weight: 0.021, torque_value: 12, oem_code: 'DUC-44321-B'})
MERGE (screw)-[:ALTERNATIVE]->(screwAlt)
