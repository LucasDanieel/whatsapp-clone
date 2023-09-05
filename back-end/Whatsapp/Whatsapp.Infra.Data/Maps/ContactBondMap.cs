using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Infra.Data.Maps
{
    internal class ContactBondMap : IEntityTypeConfiguration<ContactBond>
    {
        public void Configure(EntityTypeBuilder<ContactBond> builder)
        {
            builder.ToTable("Contact_Bond");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .IsRequired()
                .UseIdentityColumn()
                .HasColumnName("Id");
            
            builder.Property(x => x.UserIdSent)
                .IsRequired()
                .HasColumnName("User_Id_Sent");

            builder.Property(x => x.UserIdReceived)
                .IsRequired()
                .HasColumnName("User_Id_Received");
        }
    }
}
