import { COLORS } from '../colors'

const button = {
  action: {
    marginLeft: 10,
    borderRadius: 1000,
    backgroundColor: COLORS.dark500,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    color: COLORS.white
  }
}

const list = {
  row: {
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.dark400,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowTitle: {
    paddingRight: 50
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row'
  }
}

export const commonStyles = {
  button,
  list
}
