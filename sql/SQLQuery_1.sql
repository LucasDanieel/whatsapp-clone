-- CREATE DATABASE Whatsapp_Clone

Use WhatsApp_Clone

CREATE TABLE[User](
    [Id] UNIQUEIDENTIFIER DEFAULT NEWID(),
    [Name] NVARCHAR(50) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL UNIQUE,
    [Password] NVARCHAR(100) NOT NULL,

    CONSTRAINT [PK_User_Id] PRIMARY KEY ([Id])
)