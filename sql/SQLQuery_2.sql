SELECT *
FROM [User]

SELECT *
FROM [User] LEFT JOIN [User_Image] ON [User].[Id] = [User_Image].[User_Id]
WHERE [Email] LIKE '%test%'

UPDATE [User] SET [Note] = '.' WHERE [Id] = 27

INSERT INTO [Contact_Bond]
VALUES(6, 1)

UPDATE [User] SET [Note] ='.' WHERE [User].[Id] = 15
 
SELECT *
FROM [Contact_Bond] AS [c]
    INNER JOIN [User] AS [u] ON [u].[Id] = [c].[User_Id_Sent] OR [u].[Id] = [c].[User_Id_Received]
WHERE [u].Id != 1

SELECT CASE
          WHEN [u].[Id] <> 1 THEN CAST(1 AS bit)
          ELSE CAST(0 AS bit)
      END, [u].[Id], [u].[Email], [u].[Name], [u].[Note], [u].[Password], [u1].[Id], [u1].[Image_Url], [u1].[Public_Id], [u1].[User_Id],
    [u0].[Id], [u0].[Email], [u0].[Name], [u0].[Note], [u0].[Password], [u2].[Id], [u2].[Image_Url], [u2].[Public_Id], [u2].[User_Id]
FROM [Contact_Bond] AS [c]
    INNER JOIN [User] AS [u] ON [c].[User_Id_Sent] = [u].[Id]
    INNER JOIN [User] AS [u0] ON [c].[User_Id_Received] = [u0].[Id]
    LEFT JOIN [User_Image] AS [u1] ON [u].[Id] = [u1].[User_Id]
    LEFT JOIN [User_Image] AS [u2] ON [u0].[Id] = [u2].[User_Id]
WHERE [c].[User_Id_Received] = 1 OR [c].[User_Id_Sent] = 1

SELECT *
FROM [Contact_Bond]
WHERE 
    [Contact_Bond].User_Id_Received = 1 AND [Contact_Bond].User_Id_Sent = 2
    OR [Contact_Bond].User_Id_Received = 2 AND [Contact_Bond].User_Id_Sent = 1

SELECT *
FROM [User_Image]

INSERT INTO [User_Image]
VALUES(2, 'https:aaaa', 'aaaa')

DELETE FROM [User] WHERE [Id] = 4

DELETE FROM [User_Image] WHERE [User_Id] = 2

UPDATE [User] SET [Note] = 'test' WHERE [Id] = 1


DECLARE @i INT = 1;
DECLARE @Name NVARCHAR(50), @Email NVARCHAR(100), @Password NVARCHAR(100);

WHILE @i <= 5
BEGIN
    SET @Name = 'Teste ' + CAST(@i AS NVARCHAR(2))
    SET @Email = 'Teste' + CAST(@i AS NVARCHAR(2)) + '@gmail.com'
    SET @Password = CAST(@i AS NVARCHAR(2)) * 10

    INSERT INTO [User]
        (Name, Email, [Password])
    VALUES(@Name, @Email, @Password)

    SET @i = @i + 1
END

SELECT
    *
FROM [User] AS [u]
    INNER JOIN [Contact_Bond] AS [c] ON [c].User_Id_Received = [u].Id OR [c].User_Id_Sent = 1
        AND [c].User_Id_Received = 1 OR [c].User_Id_Sent = [u].Id
WHERE [u].[Email] LIKE '%' AND [u].Id = [c].User_Id_Received AND [u].Id = [c].User_Id_Sent AND [u].[Id] != 1

SELECT
    [u].[Id], [u].[Name], [u].[Email], [u].[Note], [u].[Last_Access], [i].[Image_Url]
FROM [User] AS [u]
    INNER JOIN [Contact_Bond] AS [c] ON [u].[Id] = [c].[User_Id_Received] OR [u].[Id] = [c].[User_Id_Sent]
    LEFT JOIN [User_Image] AS [i] ON [i].[User_Id] = [u].[Id]
WHERE [u].[Id] != 1

SELECT CASE
          WHEN [u].[Id] <> 1 THEN CAST(1 AS bit)
          ELSE CAST(0 AS bit)
      END, [u].[Id], [u].[Name], [u].[Email], [u].[Note], [u].[Last_Access], [u0].[Image_Url], [u1].[Id], [u1].[Name], [u1].[Email], [u1].[Note], [u1].[Last_Access], [u2].[Image_Url]
FROM [Contact_Bond] AS [c]
    INNER JOIN [User] AS [u] ON [c].[User_Id_Sent] = [u].[Id]
    LEFT JOIN [User_Image] AS [u0] ON [u].[Id] = [u0].[User_Id]
    INNER JOIN [User] AS [u1] ON [c].[User_Id_Received] = [u1].[Id]
    LEFT JOIN [User_Image] AS [u2] ON [u1].[Id] = [u2].[User_Id]
WHERE [c].[User_Id_Received] = 1 OR [c].[User_Id_Sent] = 1

SELECT *
FROM [Contact_Bond]

SELECT [c].[Id], [c].[User_Id_Received], [c].[User_Id_Sent]
          FROM [Contact_Bond] AS [c]
          WHERE [c].[User_Id_Received] = 2 OR [c].[User_Id_Sent] = 2


 
UPDATE [Message] SET [Message_Status] = 3

SELECT *
FROM [Message] as [m]
WHERE m.User_Id_Received = 1 AND m.User_Id_Sent = 2 OR m.User_Id_Received = 2  AND m.User_Id_Sent = 1
ORDER BY [Date_Time] DESC

UPDATE [Message] SET [Text] = 'teste1' WHERE [Id] = 801

INSERT INTO [Message] VALUES(null, 1, 2, GETDATE(), 2, 'https://res.cloudinary.com/dbusijp42/image/upload/v1684152564/whatsapp/teste1%40gmail.com-c98a4c19-4046-4047-9f15-649cacdec186.jpg', 'whatsapp/teste1@gmail.com-c98a4c19-4046-4047-9f15-649cacdec186')

SELECT TOP(30) [m].[Id], [m].[Date_Time], [m].[Image_Url], [m].[Message_Status], [m].[Public_Id], [m].[Text], [m].[User_Id_Received], [m].[User_Id_Sent]
      FROM [Message] AS [m]
      WHERE [m].[Date_Time] < GETDATE()
      ORDER BY [m].[Date_Time] DESC


SELECT TOP(10)* FROM [Contact_Bond]
SELECT TOP(10)* FROM [Message]
SELECT TOP(10)* FROM [User]
SELECT TOP(10)* FROM [User_Image]

DELETE FROM [User] WHERE [Id] = 30

DELETE FROM [User_Image] WHERE [User_Id] = 30

DELETE FROM [Contact_Bond] WHERE [User_Id_Sent] = 31 OR [User_Id_Received] = 31 

DELETE FROM [Message] WHERE [User_Id_Sent] = 31 OR [User_Id_Received] = 31 

INSERT INTO [Message] VALUES('dddd', 31, 28, '2023-08-10 17:22:14.1400000', 3, null, null, null)