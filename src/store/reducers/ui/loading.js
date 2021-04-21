import { SHOW_LOADING, HIDE_LOADING } from '../../types/ui/loading';

function initState() {
  return {
    visibility: 'none'
  };
}

export default function (state = initState(), action) {
  const { type } = action;

  switch (type) {
    case SHOW_LOADING:
      return {
        visibility: 'shown'
      };

    case HIDE_LOADING:
      return {
        visibility: 'hidden'
      };

    default:
      return state;
  }
}
