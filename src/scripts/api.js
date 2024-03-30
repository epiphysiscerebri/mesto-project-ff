const getInformationProfile = async function() {
 let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
    method: "GET",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}

const getCardsList = async function() {
  let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards`, {
    method: "GET",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}
 
const changeInformationProfile = async function(data) {
  let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me`, {
    method: "PATCH",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${data.name}`,
      about: `${data.about}`
    })
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}

const addCard = async function(data) {
  let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards`, {
    method: "POST",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${data.name}`,
      link: `${data.link}`
    })
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}

const deleteCard = async function(data) {
  let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${data._id}`, {
    method: "DELETE",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}

const changeLikesCount = async function(data, typeReq) {
  let response
  if (typeReq) {
    response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${data._id}`, {
      method: "PUT",
      headers: {
        'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err)
    })
  } else if (!typeReq) {
    response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: {
        'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch((err) => {
      console.log(err)
    })
  }
  return response
}

const changeProfileImage = async function(data) {
  let response = await fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar`, {
    method: "PATCH",
    headers: {
      'authorization': '35013647-1b56-43bb-8500-83916643fc5d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${data.avatar}`,
    })
  }).then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
    console.log(err)
  })
  return response
}

export {getInformationProfile, getCardsList, changeInformationProfile, addCard, deleteCard, changeLikesCount, changeProfileImage}