type DifferentTypeOfUser = User | Admin | Advisor

enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ADVISOR = 'advisor',
}

class ChatRoom {
  id: string = ''
  name: string = ''
  users: User[] = []
  messages: Message[] = []
  constructor(obj?: ChatRoom) {
    if (!obj) return
    this.id = obj.id
    this.name = obj.name
    this.users = obj.users
    this.messages = obj.messages
  }
}

class Message {
  id: string = ''
  content: string = ''
  sender: User = new User()
  date: Date = new Date()
  constructor(obj?: Message) {
    if (!obj) return
    this.id = obj.id
    this.content = obj.content
    this.sender = obj.sender
    this.date = obj.date
  }
}

class Request {
  id: string
  user: User
  advisor: Advisor
  date: Date
  constructor(obj?: Request) {
    if (!obj) return
    this.id = obj.id
    this.user = obj.user
    this.advisor = obj.advisor
    this.date = obj.date
  }
}

class GlobalUser {
  id: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
  typeOfUser: DifferentTypeOfUser = new User()

  constructor(obj?: GlobalUser) {
    if (!obj) return
    this.id = obj.id
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.email = obj.email
    this.password = obj.password
    this.typeOfUser = obj.typeOfUser
  }
}

class CommunicationRequest {
  id: string = ''
  user: User = new User()
  advisor: Advisor = new Advisor()
  date: Date = new Date()
  constructor(obj?: CommunicationRequest) {
    if (!obj) return
    this.id = obj.id
    this.user = obj.user
    this.advisor = obj.advisor
    this.date = obj.date
  }
}

class Admin extends GlobalUser {
  role: Role = Role.ADMIN
  constructor(obj?: GlobalUser) {
    super(obj)
  }
}

class Advisor extends GlobalUser {
  role: Role = Role.ADVISOR
  constructor(obj?: GlobalUser) {
    super(obj)
  }

  seePendingRequests() {
    // TODO // ● It is possible to see the pending communication requests
  }

  refuseRequest() {
    // TODO // ● It is possible to refuse a communication request
  }

  acceptRequest() {
    // TODO // ● It is possible to accept a communication request
  }

  registerAsAvailable() {
    // TODO // ● It is possible to register as available to communicate with clients
  }

  createChatRoom() {
    // TODO // ● It is possible to create a chat room
  }

  changeChatRoomName() {
    // TODO // ● It is possible to change the name of a chat room
  }

  changeChatRoomUsersNumber() {
    // TODO // ● It is possible to change the number of users in a chat room
  }

  deleteChatRoom() {
    // TODO // ● It is possible to delete a chat room
  }

  sendCommercialNotification() {
    // TODO // ● It is possible to send commercial notifications
  }

  sendMessage() {
    // TODO It is not possible to communicate in a deleted chat room
  }
}

class User extends GlobalUser {
  askToTalkWithAdvisor() {
    // TODO It is possible to request to contact a sales consultant only if an advisor is available
  }

  talkWithBot() {
    // TODO run the workflow of the bot
  }

  talkWithAUser(userToTalkWith: User) {
    // TODO
  }

  joinChatRoom(chatRoom: ChatRoom) {
    // TODO // ● It is possible to join chat rooms predefined by an administrator and only if the chat room is not full
  }

  leaveChatRoom() {
    // TODO
  }

  receiveCommercialNotifications() {
    // TODO // ● It is possible to receive commercial notifications from an administrator
  }

  sendMessage() {
    // TODO It is not possible to communicate in a deleted chat room
  }
}

class CommertialNotification {
  id: string = ''
  content: string = ''
  date: Date = new Date()
  constructor(obj?: CommertialNotification) {
    if (!obj) return
    this.id = obj.id
    this.content = obj.content
    this.date = obj.date
  }
}

class Bot {
  id: string = ''
  name: string = ''
  constructor(obj?: Bot) {
    if (!obj) return
    this.id = obj.id
    this.name = obj.name
  }
}

class BotMessage {
  id: string = ''
  content: string = ''
  date: Date = new Date()
  constructor(obj?: BotMessage) {
    if (!obj) return
    this.id = obj.id
    this.content = obj.content
    this.date = obj.date
  }
}
