CREATE DATABASE jasboot;


CREATE TABLE usersaccess (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    u_password VARCHAR(255) NOT NULL
);
INSERT INTO usersaccess(username,email,u_password) VALUES 
('JASTACIO','jasbootstudios@gmail.com','Jastacio1999*'),
('Maria456', 'maria.gomez@example.com', 'password2'),
('Pedro789', 'pedro.ramirez@example.com', 'password3'),
('Ana987', 'ana.lopez@example.com', 'password4'),
('Juan123', 'juan.perez@example.com', 'password1');

CREATE TABLE data_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    u_name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    u_address TEXT NOT NULL,
    age INT NOT NULL,
    u_role ENUM('admin','user','comon_user','super_admin','moderate') DEFAULT 'comon_user',
    recuperate_token VARCHAR(255),
    last_connection DATETIME,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES usersaccess(id) ON DELETE CASCADE
);

INSERT INTO data_users (user_id, u_name, lastName, email, phone, u_address, age, u_role, recuperate_token, last_connection)
VALUES (1, 'Jefry', 'Astacio', 'jasbootstudios@gmail.com', '8294419998', 'Calle 25, salida 12', 22, 'admin', NULL, NOW()),
(2, 'Maria', 'Gomez', 'maria.gomez@example.com', '0987654321', 'Avenida Siempre Viva 742', 25, 'user', NULL, NOW()),
(3, 'Pedro', 'Ramirez', 'pedro.ramirez@example.com', '1122334455', 'Calle Principal 456', 28, 'moderate', NULL, NOW()),
(4, 'Ana', 'Lopez', 'ana.lopez@example.com', '2233445566', 'Boulevard Central 321', 32, 'super_admin', NULL, NOW()),
(5, 'Juan', 'Pérez', 'juan.perez@example.com', '1234567890', 'Calle Falsa 123', 30, 'admin', NULL, NOW());


-- Asi se hace la consulta a una tabla relacionada.

SELECT u.id, u.username, u.email, d.u_name, d.lastName, d.phone, d.u_address, d.age, d.u_role, d.last_connection FROM usersaccess u LEFT JOIN data_users d ON u.id = d.user_id;
