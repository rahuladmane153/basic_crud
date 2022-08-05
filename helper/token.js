const jwt = require('jsonwebtoken');
const config = require('../config.json');
const mongoose = require('mongoose');
const ERROR = require('./errorMessage');
const log = require('./logger');
const userSession = mongoose.model('UserSession');

module.exports = {
  encrypt: function (req, user) {
    console.log("user", user)
    return new Promise((resolve, reject) => {
      userSession.updateMany({
          userId: user._id
        }, {
          status: 'deleted'
        }, {
          $new: true
        })
        .then(resSessionUpdate => {
          const data = {
            userId: user._id,
            userAgent: req.get('User-Agent'),
          }
          const userSessionAdd = new userSession(data);
          user['sessionId'] = userSessionAdd._id;
          userSessionAdd.userToken = 'JWT ' + jwt.sign(user, config.secretKey);
          userSessionAdd.save()
            .then(resSession => {
              resolve({
                token: resSession.userToken
              });
            }).catch(error => {
              log.debug(error);
              reject(ERROR.SOMETHING_WENT_WRONG);
            })
        }).catch(error => {
          log.debug(error);
          reject(ERROR.SOMETHING_WENT_WRONG);
        })
    })
  },
  decrypt: function (req, userToken) {
    return new Promise((resolve, reject) => {
      const userData = jwt.verify(userToken, config.secretKey);
      console.log("userData", userData)
      userSession.findOne({
        _id: userData.sessionId,
        status: {
          $ne: 'deleted'
        },
        userAgent: req.get('User-Agent')
      }).then(resData => {
        if (resData) {
          req['userId'] = userData._id;
          req['sessionId'] = userData.sessionId;
          req['designation'] = userData.designation;
          resolve()
        } else {
          reject(ERROR.UNAUTHORIZED);
        }
      }).catch(error => {
        log.error(error);
        reject(ERROR.SOMETHING_WENT_WRONG);
      })
    })
  }
};