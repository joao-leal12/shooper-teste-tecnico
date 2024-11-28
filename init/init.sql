
CREATE TABLE drivers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(2000),
    car VARCHAR(100),
    rating NUMERIC(2,1),  
    feedback VARCHAR(2000), 
    rate NUMERIC(10,2),
    min_km INTEGER NOT NULL
);

INSERT INTO drivers (name, description, car, rating, feedback, rate, min_km) 
VALUES 
('Homer Simpson', 
 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 
 'Plymouth Valiant 1973 rosa e enferrujado', 
 2.0, 
 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
 2.50,  
 1),

('Dominic Toretto', 
 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 
 'Dodge Charger R/T 1970 modificado', 
 4.0,  
 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
 5.00, 
 5),

('James Bond', 
 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 
 'Aston Martin DB5 clássico', 
 5.0, 
 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
 10.00, 
 10);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL,
    origin TEXT NOT NULL, 
    destination TEXT NOT NULL,
    distance INTEGER NOT NULL,
    duration VARCHAR(100) NOT NULL,
    driver_id INTEGER NOT NULL REFERENCES drivers(id),
    fare NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
