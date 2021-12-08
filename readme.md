Библиотеки для react

npm install react-phone-input-2 --save

import PhoneInput from 'react-phone-input-2'    
import 'react-phone-input-2/lib/style.css' 

Реакт компонент для телефона. Вставить вместо input под todo    
<PhoneInput  
    country={'ru'}  
    inputProps={{   
    placeholder:'В международном формате'   
    }}  
    preferredCountries={['ua','by','kz','ru','md','de','il','us','pl','cz','lt','lv','ee','ge','uz','tj','es']} 
    value={this.state.phone}    
    onChange={phone => this.setState({ phone })}    
/>