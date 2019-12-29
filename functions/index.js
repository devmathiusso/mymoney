const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sum = functions.database
  .ref("/cash-flow/{monthYear}")
  .onWrite(async (change, context) => {
    const monthsRef = admin
      .database()
      .ref(`/months/${context.params.monthYear}`);
    const cashFlowRef = change.after.ref;
    const cashFlowSS = await cashFlowRef.once("value");
    const cashFlow = cashFlowSS.val();

    let incomings = 0;
    let outgoings = 0;

    Object.keys(cashFlow).forEach(ym => {
      const cashFlowValue = cashFlow[ym].value;

      if (cashFlowValue > 0) incomings += cashFlowValue;
      else outgoings += cashFlowValue;
    });

    return monthsRef.transaction(current => {
      if (current === null) {
        return {
          incomings,
          outgoings,
          incoming_predict: 0,
          outgoing_predict: 0
        };
      }

      return {
        ...current,
        incomings,
        outgoings
      };
    });
  });
