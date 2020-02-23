import { color } from '../utils/variables'

const styles = {
  checkout: {
    alignItems: 'center'
  },
  checkoutButton: {
    backgroundColor: color.transparent,
    borderColor: color.green500,
    borderRadius: 3,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    width: '70%'
  },
  checkoutButtonText: {
    color: color.green500,
    textAlign: 'center'
  },
  promoCode: {
    flex: 1
  },
  promoCodeButton: {
    backgroundColor: color.green500,
    borderRadius: 5,
    padding: 5
  },
  promoCodeInput: {
    borderColor: color.gray500,
    borderWidth: 1,
    flex: 1,
    height: 30,
    marginHorizontal: 3,
    paddingVertical: 3
  },
  promoCodeText: {
    color: color.white
  }
}

export default styles
