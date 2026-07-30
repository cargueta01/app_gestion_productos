IF DB_ID(N'serfina_db') IS NULL
BEGIN
    CREATE DATABASE serfina_db;
END
GO

USE serfina_db;
GO

IF OBJECT_ID(N'dbo.app_users', N'U') IS NULL
BEGIN
CREATE TABLE dbo.app_users (
                               id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
                               email NVARCHAR(160) NOT NULL,
                               password NVARCHAR(100) NOT NULL,
                               role NVARCHAR(20) NOT NULL,
                               CONSTRAINT UQ_app_users_email UNIQUE (email),
                               CONSTRAINT CK_app_users_role CHECK (role IN ('USER', 'ADMIN'))
);
END
GO

IF OBJECT_ID(N'dbo.products', N'U') IS NULL
BEGIN
CREATE TABLE dbo.products (
                              id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
                              name NVARCHAR(120) NOT NULL,
                              description NVARCHAR(1000) NOT NULL,
                              price DECIMAL(12,2) NOT NULL,
                              stock INT NOT NULL,
                              product_type NVARCHAR(30) NOT NULL,
                              CONSTRAINT CK_products_price CHECK (price > 0),
                              CONSTRAINT CK_products_stock CHECK (stock >= 0)
);
END
GO