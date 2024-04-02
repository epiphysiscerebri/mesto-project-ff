const baseURL = "https://nomoreparties.co/v1/pwff-cohort-1";
const headers = {
  "authorization": "35013647-1b56-43bb-8500-83916643fc5d",
  "Content-Type": "application/json",
};
const checkStateDataServer = function(data) {
  if(data.ok) {
    return data.json()
  } else {
    return Promise.reject(`Ошибка: ${data.status}`);
  }
}

const getInformationProfile = async function () {
  return await fetch(baseURL + `/users/me`, {
    method: "GET",
    headers,
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

const getCardsList = async function () {
  return await fetch(baseURL + `/cards`, {
    method: "GET",
    headers,
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

const changeInformationProfile = async function (data) {
  return await fetch(baseURL + `/users/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name: `${data.name}`,
      about: `${data.about}`,
    }),
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

const addCard = async function (data) {
  return await fetch(baseURL + `/cards`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: `${data.name}`,
      link: `${data.link}`,
    }),
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

const deleteCard = async function (data) {
  return await fetch(baseURL + `/cards/${data._id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

const changeLikesCount = async function (data, typeReq) {
  if (typeReq) {
    return await fetch(baseURL + `/cards/likes/${data._id}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => {
        return checkStateDataServer(res)
      });
  } else if (!typeReq) {
    return await fetch(baseURL + `/cards/likes/${data._id}`, {
      method: "PUT",
      headers,
    })
      .then((res) => {
        return checkStateDataServer(res)
      });
  }
};

const changeProfileImage = async function (data) {
  return await fetch(baseURL + `/users/me/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      avatar: `${data.avatar}`,
    }),
  })
    .then((res) => {
      return checkStateDataServer(res)
    });
};

export {
  getInformationProfile,
  getCardsList,
  changeInformationProfile,
  addCard,
  deleteCard,
  changeLikesCount,
  changeProfileImage,
};
