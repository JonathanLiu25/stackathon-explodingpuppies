// Keep track of which names are used so that there are no duplicates
class NameList {
  constructor() {
    this.names = {}
  }

  // add name to list of names
  claim(name, room) {
    if (!name || this.names[name]) {
      return false
    } else {
      this.names[name] = room
      return true
    }
  }

  // find the lowest unused "guest" name and claim it
  getGuestName(room) {
    let name,
      nextUserId = 1

    while (!this.claim(name, room)) {
      name = 'Guest' + nextUserId
      nextUserId += 1
    }

    return name
  }

  // serialize claimed names as an array
  get(room) {
    const res = Object.keys(this.names).filter(key => this.names[key] === room)

    return res
  }

  // remove name from the list of names
  free(name) {
    if (this.names[name]) {
      delete this.names[name]
    }
  }
}

module.exports = NameList
