import { all, call, put, takeEvery } from "redux-saga/effects";
import { callApi } from "../../common/util/api";
import { actions, Types } from "./index";

function* fetchAutoComplete({ keyword }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/user/search',
    params: { keyword },
  });

  if (isSuccess && data) {
    yield put(actions.setValue('autoCompletes', data));
  }
}

export default function* () {
  yield all([
    takeEvery(Types.FetchAutoComplete, fetchAutoComplete),
  ]);
}