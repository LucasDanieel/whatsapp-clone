using System.ComponentModel.DataAnnotations.Schema;

namespace Whatsapp.Domain.Entities
{
    public class ContactBond
    {
        public int Id { get; private set; }
        public int UserIdSent { get; private set; }
        public int UserIdReceived { get; private set; }
    }
}
