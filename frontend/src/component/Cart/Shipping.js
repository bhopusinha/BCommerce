import React, { useState } from 'react';
import './Shipping.css';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@material-ui/icons';
import { Country, State } from 'country-state-city';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../Cart/CheckOutSteps.js';
import { saveShippingInfo } from '../../actions/cartActions.js';

const Shipping = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector(state => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPincode] = useState(shippingInfo.pinCode);
  const [phoneCode, setPhoneCode] = useState(shippingInfo.phoneCode);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneCode.length < 10 || phoneCode.length > 10) {
      alert.error("phone number should be 10 digit Long");
      return;
    }

    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneCode }));

    navigate('/order/confirm');
  }

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckOutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form className="shippingForm"
            required
            encType='multipart/form-data'
            onSubmit={shippingSubmit}
          >

            <div>
              <Home />
              <input type="text"
                required
                value={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input type="text"
                required
                value={city}
                placeholder='City'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input type="text"
                required
                value={pinCode}
                placeholder='Pincode'
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <Phone />
              <input type="number"
                required
                value={phoneCode}
                placeholder='Phone Number'
                onChange={(e) => setPhoneCode(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <Public />
              <select
                required
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              >
                <option value="">Country</option>
                {
                  Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode} >{item.name}</option>
                  ))
                }
              </select>
            </div>

            {
              country &&
              <div>
                <TransferWithinAStation />
                <select
                  required
                  onChange={(e) => setState(e.target.value)}
                  value={state}>

                  <option value="">State</option>
                  {
                    State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                    ))
                  }
                </select>
              </div>
            }
            <input type="submit"
              value="Continue"
              className='shippingBtn'
              disabled={state ? false : true}
            />
          </form>

        </div>
      </div>
    </>
  )
}

export default Shipping
