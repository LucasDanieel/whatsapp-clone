using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Infra.Data.Maps
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("Id");

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("Name");

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnName("Email");

            builder.Property(x => x.Password)
                .IsRequired()
                .HasColumnName("Password");

            builder.Property(x => x.Note)
                .IsRequired()
                .HasColumnName("Note");

            builder.Property(x => x.LastAccess)
                .HasColumnName("Last_Access");

            builder.HasOne(x => x.UserImage)
                .WithOne(x => x.User)
                .HasForeignKey<UserImage>(x => x.UserId);
        }
    }
}
