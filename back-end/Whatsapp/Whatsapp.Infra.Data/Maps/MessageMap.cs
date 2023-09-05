using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Infra.Data.Maps
{
    public class MessageMap : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("Message");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("Id")
                .UseIdentityColumn();

            builder.Property(x => x.Text)
                .HasColumnName("Text");
            
            builder.Property(x => x.UserIdSent)
                .IsRequired()
                .HasColumnName("User_Id_Sent");

            builder.Property(x => x.UserIdReceived)
                .IsRequired()
                .HasColumnName("User_Id_Received");

            builder.Property(x => x.DateTime)
                .IsRequired()
                .HasColumnName("Date_Time")
                .HasDefaultValueSql("GETDATE()");

            builder.Property(x => x.MessageStatus)
                .HasColumnName("Message_Status");

            builder.Property(x => x.ImageUrl)
                .HasColumnName("Image_Url");

            builder.Property(x => x.PublicId)
                .HasColumnName("Public_Id");

            builder.Property(x => x.RespondedMessageId)
                .HasColumnName("Responded_Message_Id");

        }
    }
}
