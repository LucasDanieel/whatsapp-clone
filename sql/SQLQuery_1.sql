-- CREATE DATABASE Whatsapp_Clone

Use WhatsApp_Clone

CREATE TABLE[User]
(
    [Id] INT NOT NULL IDENTITY(1, 1),
    [Name] NVARCHAR(50) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL UNIQUE,
    [Password] NVARCHAR(100) NOT NULL,
    [Note] NVARCHAR(40) NULL,
    [Last_Access] DATETIME2 NULL,

    CONSTRAINT [PK_User_Id] PRIMARY KEY ([Id])
)

ALTER TABLE [User] ADD [Last_Access] DATETIME2 NULL

EXEC sp_rename 'dbo.user.LastAccess', 'Last_Access', 'COLUMN'

-- ALTER TABLE [User] ADD [New_ID] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY

-- ALTER TABLE [User] DROP COLUMN [Id]

-- ALTER TABLE [User] DROP CONSTRAINT [DF__User__Id__25869641]

CREATE TABLE[User_Image]
(
    [Id] INT NOT NULL IDENTITY(1, 1),
    [User_Id] INT NOT NULL,
    [Image_Url] NVARCHAR(250) NULL,
    [Public_Id] NVARCHAR(100) NULL,

    CONSTRAINT [PK_UserImage_Id] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserImage_User_Id] FOREIGN KEY ([User_Id])
     REFERENCES [User]([Id])
)

ALTER TABLE [User_Image] ADD CONSTRAINT [PK_UserImage_Id] PRIMARY KEY ([Id])


CREATE TABLE[Contact_Bond]
(
    [Id] INT NOT NULL IDENTITY(1, 1),
    [User_Id_Sent] INT NOT NULL,
    [User_Id_Received] INT NOT NULL,

    CONSTRAINT [PK_Contects_Bond_Id] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserIdSend_User_Id] FOREIGN KEY ([User_Id_Sent]) REFERENCES [User]([Id]),
    CONSTRAINT [FK_UserIdReceived_User_Id] FOREIGN KEY ([User_Id_Received]) REFERENCES [User]([Id]),
)

ALTER TABLE [Contact_Bond] DROP CONSTRAINT FK_UserIdReceived_User_Id

DROP TABLE Contact_Bond

SELECT *
FROM [Contact_Bond]

CREATE TABLE[Message]
(
    [Id] INT NOT NULL IDENTITY(1, 1),
    [Text] NVARCHAR(250) NULL,
    [Image_Url] NVARCHAR(250) NULL,
    [Public_Id] NVARCHAR(100) NULL,
    [User_Id_Sent] INT NOT NULL,
    [User_Id_Received] INT NOT NULL,
    [Date_Time] DATETIME2 NOT NULL DEFAULT(GETDATE()),
    [Message_Status] INT NOT NULL,
    [Responded_Message_Id] INT NULL,

    CONSTRAINT [PK_Message_Id] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Message_UserIdSend_User_Id] FOREIGN KEY ([User_Id_Sent]) REFERENCES [User]([Id]),
    CONSTRAINT [FK_Message_UserIdReceived_User_Id] FOREIGN KEY ([User_Id_Received]) REFERENCES [User]([Id]),
)

DROP TABLE [Message]

ALTER TABLE [Message] ALTER COLUMN [Text] NVARCHAR(250) NULL

ALTER TABLE [Message] ADD [Responded_Message_Id] INT NULL

CREATE TABLE[User_Message]
(
    [Id] INT NOT NULL IDENTITY(1, 1),
    [User_Id_Sent] INT NOT NULL,
    [User_Id_Received] INT NOT NULL,
)