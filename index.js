#!/usr/bin/env node

class Main {
  run() {
    this.eventdate = new EventDate(2022, 1, 1)
  }
}

class EventDate {
  constructor(birthYear, birthMonth, birthDay) {
    this.birthYear = birthYear
    this.birthMonth = birthMonth
    this.birthDay = birthDay
  }

  getBirth() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay)
  }

  getHalfBirth() {
    return new Date(this.birthYear, this.birthMonth + 5, this.birthDay)
  }

  getOkuizome() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 99)
  }

  getOmiyamairiForBoy() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 30)  
  }

  getOmiyamairiForGirl() {
    return new Date(this.birthYear, this.birthMonth - 1, this.birthDay + 31)  
  }

  getMomonosekku() {
    if(this.getBirth() > new Date(this.birthYear, 3, 3)) {
      return new Date(this.birthYear + 1, 3, 3)
    } else {
      return new Date(this.birthYear, 3, 3)
    }
  }

  getSekku() {
    if(this.getBirth() > new Date(this.birthYear, 5, 5)) {
      return new Date(this.birthYear + 1, 4, 5)
    } else {
      return new Date(this.birthYear, 4, 5)
    }
  }

  getSichigosanForThree() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 4, 9, 15)
    } else {
      return new Date(this.birthYear + 3, 9, 15)
    }
  }

  getSichigosanForFive() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 6, 9, 15)
    } else {
      return new Date(this.birthYear + 5, 9, 15)
    }
  }

  getSichigosanForSeven() {
    if(this.getBirth() > new Date(this.birthYear, 10, 15)) {
      return new Date(this.birthYear + 8, 9, 15)
    } else {
      return new Date(this.birthYear + 7, 9, 15)
    }
  }

  getElementarySchool() {
    if(this.getBirth() > new Date(this.birthYear, 4, 1)) {
      return new Date(this.birthYear + 7, 3, 1)
    } else {
      return new Date(this.birthYear + 6, 3, 1)
    }
  }
} 

new Main().run()
