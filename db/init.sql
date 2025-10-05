CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('usuario','empresa','admin','despachador') DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- TABLA DE EMPRESAS
-- ==============================
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- TABLA DE AMBULANCIAS
-- ==============================
CREATE TABLE ambulancias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    patente VARCHAR(50) UNIQUE NOT NULL,
    estado ENUM('disponible','en_servicio','mantenimiento') DEFAULT 'disponible',
    ubicacion_lat DECIMAL(10,7),
    ubicacion_lng DECIMAL(10,7),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- ==============================
-- TABLA DE PEDIDOS
-- ==============================
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    ambulancia_id INT, -- se puede mantener para referencia rápida
    descripcion TEXT,
    estado ENUM('pendiente','asignado','en_camino','completado','cancelado') DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id) ON DELETE SET NULL
);

-- ==============================
-- TABLA DE NOTIFICACIONES
-- ==============================
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==============================
-- TABLA DE DESPACHADORES
-- ==============================
CREATE TABLE despachadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    empresa_id INT,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- ==============================
-- TABLA DE ASIGNACIONES
-- ==============================
CREATE TABLE asignaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    ambulancia_id INT NOT NULL,
    asignado_por INT, -- usuario_id del despachador
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id) ON DELETE CASCADE,
    FOREIGN KEY (asignado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- ==============================
-- TABLA DE TRACKING (UBICACIONES HISTÓRICAS)
-- ==============================
CREATE TABLE tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ambulancia_id INT NOT NULL,
    lat DECIMAL(10,7) NOT NULL,
    lng DECIMAL(10,7) NOT NULL,
    registrado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ambulancia_id) REFERENCES ambulancias(id) ON DELETE CASCADE
);
