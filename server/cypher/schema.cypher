// Uniqueness constraints
CREATE CONSTRAINT part_id_unique IF NOT EXISTS
FOR (p:Part) REQUIRE p.part_id IS UNIQUE;

CREATE CONSTRAINT product_id_unique IF NOT EXISTS
FOR (p:Product) REQUIRE p.product_id IS UNIQUE;

CREATE CONSTRAINT assembly_id_unique IF NOT EXISTS
FOR (a:Assembly) REQUIRE a.assembly_id IS UNIQUE;

// Helpful indexes
CREATE INDEX part_oem_code IF NOT EXISTS FOR (p:Part) ON (p.oem_code);
CREATE INDEX part_material IF NOT EXISTS FOR (p:Part) ON (p.material);
