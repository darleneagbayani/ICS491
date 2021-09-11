import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import React from 'react';

class VaccinationStatus extends React.Component {

  render() {
    const { vaccineName, firstDoseManufacturer, dateString1, firstDoseHealthcare, secondDoseManufacturer, dateString2, secondDoseHealthcare } = this.props;
    return (
      <Card id='checkin-card'>
        <Card.Content>
          <Card.Header className='vaccination-header'>
              Vaccine Name</Card.Header>
          <Card.Description>{vaccineName}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='vaccination-header'>
              1st Dose: Manufacturer Lot Number
          </Card.Header>
          <Card.Description>{firstDoseManufacturer}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='vaccination-header'>
              1st Dose: Date
          </Card.Header>
          <Card.Description>{dateString1}</Card.Description>
        </Card.Content>
        
        <Card.Content>
          <Card.Header className='vaccination-header'>
              1st Dose: Healthcare Professional or Clinic</Card.Header>
          <Card.Description>{firstDoseHealthcare}</Card.Description>
        </Card.Content>

        <Card.Content>
          <Card.Header className='vaccination-header'>
              2nd Dose: Manufacturer Lot Number
          </Card.Header>
          <Card.Description>{secondDoseManufacturer}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='vaccination-header'>
              2nd Dose: Date
          </Card.Header>
          <Card.Description>{dateString2}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header className='vaccination-header'>
              2nd Dose: Healthcare Professional or Clinic
          </Card.Header>
          <Card.Description>{secondDoseHealthcare}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

VaccinationStatus.propTypes = {
  vaccineName: PropTypes.string,
  firstDoseManufacturer: PropTypes.string,
  dateString1: PropTypes.string,
  firstDoseHealthcare: PropTypes.string,
  secondDoseManufacturer: PropTypes.string,
  dateString2: PropTypes.string,
  secondDoseHealthcare: PropTypes.string,
};

export default VaccinationStatus;