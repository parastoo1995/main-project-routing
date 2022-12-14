import React from 'react'
import axios from '../../axios-orders'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import './Account.css'

class Account extends React.Component {
  state = {
    form: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name...'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email...'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password...'
        },
        value: ''
      }
    }
  }

  submitHandler = (event) => {
    event.preventDefault()

    let formData = {}
    for(let item in this.state.form) {
      formData[item] = this.state.form[item].value
    }
    axios.post('/account.json' , formData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  inputChangeHandler = (event , inputElement) => {
    const updatedForm = {
      ...this.state.form
    }

    const updatedElement = {
      ...updatedForm[inputElement]
    }

    updatedElement.value = event.target.value

    updatedForm[inputElement] = updatedElement

    this.setState({ form: updatedForm })
  }

  render() {
    const elementsArray = []

    for( let item in this.state.form){
      elementsArray.push({
        id: item,
        config: this.state.form[item],
      })
    }


    return (
      <div className='account'>
        <h2>Account</h2>
        <form onSubmit={this.submitHandler}>
          {elementsArray.map((item) => {
            return (
              <Input 
              key={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value} 
              change={(event) => this.inputChangeHandler(event , item.id)} />
            )
           })
          }
          <Button btnType="form">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Account
