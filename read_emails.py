from simplegmail import Gmail
from simplegmail.query import construct_query

gmail = Gmail()

# Unread messages in your inbox
print("Reading mails from Inbox.....")
messages = gmail.get_unread_inbox()
print("Total messages: ", len(messages))

file_obj = open("mails.txt", "w")

print("Starting to print")
for message in messages:
    print("----------------------------------------------------------------------------------------" + "\n")
    print("To: " + str(message.recipient) + "\n")
    print("From: " + str(message.sender) + "\n")
    print("Subject: " + str(message.subject) + "\n")
    print("Date: " + str(message.date) + "\n")
    print("Preview: " + str(message.snippet) + "\n")
    
    if(type(message.plain)!=None):
        print("Message Body: " + str(message.plain) + "\n") 
    print("----------------------------------------------------------------------------------------" + "\n")


    lines = [
        "----------------------------------------------------------------------------------------" + "\n",
        "To: " + str(message.recipient) + "\n",
        "From: " + str(message.sender) + "\n",
        "Subject: " + str(message.subject) + "\n",
        "Date: " + str(message.date) + "\n",
        "Preview: " + str(message.snippet) + "\n",
        "----------------------------------------------------------------------------------------" + "\n"
    ]
    file_obj.writelines(lines)