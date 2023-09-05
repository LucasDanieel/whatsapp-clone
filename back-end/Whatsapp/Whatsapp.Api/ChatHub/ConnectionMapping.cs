namespace Whatsapp.Api.ChatHub
{
    public class ConnectionMapping
    {
        private readonly Dictionary<string, string> _connections = new();

        public int Count
        {
            get { return _connections.Count; }
        }

        public void Add(string email, string connetionId)
        {
            lock (_connections)
            {
                string connection;
                if (!_connections.TryGetValue(email, out connection))
                {
                    _connections.Add(email, connetionId);
                }

                if (!string.IsNullOrEmpty(connection))
                {
                    _connections[email] = connection;
                }
            }
        }

        public string GetConnectionString(string email)
        {
            if (string.IsNullOrEmpty(email)) return string.Empty;

            string connection;
            if (_connections.TryGetValue(email, out connection))
            {
                return connection;
            }

            return string.Empty;
        }

        public string GetEmail(string connetionId)
        {
            foreach (var _connection in _connections)
            {
                if (_connection.Value == connetionId)
                {
                    return _connection.Key;
                }
            }
            return string.Empty;
        }

        public void Disconnected(string email)
        {
            foreach (var _connection in _connections)
            {
                if (_connection.Key == email)
                {
                    _connections.Remove(_connection.Key);
                }
            }
        }
    }
}
