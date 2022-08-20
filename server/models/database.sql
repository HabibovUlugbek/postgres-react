CREATE TABLE company (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(80) NOT NULL,
    is_deleted BOOLEAN NOT NULL 
)
CREATE TABLE technology (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    type VARCHAR(80) NOT NULL,
    name VARCHAR(80) NOT NULL,
    made_date DATE NOT NULL,
    model VARCHAR(80) NOT NULL,
    price NUMERIC(15) NOT NULL,
    company_id BIGINT REFERENCES company(id),
    is_deleted BOOLEAN NOT NULL 
);