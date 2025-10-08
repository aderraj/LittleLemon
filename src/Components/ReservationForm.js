import React, { useRef, useReducer } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/DatePicker.css';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

// API functions - these are loaded from the external script
const fetchAPI = (date) => {
  // Check if the fetchAPI function is available from the external script
  if (typeof window.fetchAPI === 'function') {
    return window.fetchAPI(date);
  }
  // Fallback implementation if API is not available
  return [
    '17:00',
    '17:30', 
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ];
};



// Initialize available times for today's date
const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

// Update available times based on selected date
const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.date);
    default:
      return state;
  }
};

const ReservationForm = ({ submitForm, onReservationData }) => {
  const paymentFormRef = useRef(null);
  const navigate = useNavigate();
  
  // State management for available times using useReducer
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const scrollToRef = (ref) => {
    if (ref.current) {
      const element = ref.current;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1800; 
      let startTime = null;
      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const run = startPosition + distance * progress;
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    }
  };
  const initialValues = {
    fullName: '',
    partySize: 2,
    occasion: 'Casual',
    date: '',
    customTime: '5:00 PM',
    seatingArea: 'Indifferent',
  };

  const validate = (values) => {
    const errors = {};

    // Full name validation
    if (!values.fullName) {
      errors.fullName = 'Please enter your full name';
    } else if (typeof values.fullName !== 'string') {
      errors.fullName = 'Invalid name format';
    } else if (values.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters)';
    } else if (values.fullName.trim().length > 50) {
      errors.fullName = 'Full name must be less than 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(values.fullName.trim())) {
      errors.fullName = 'Full name can only contain letters and spaces';
    }

    // Date validation
    if (!values.date) {
      errors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(values.date);
      const today = new Date();
      const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      
      if (selectedDate < today.setHours(0,0,0,0)) {
        errors.date = 'Please select a future date';
      } else if (selectedDate > maxDate) {
        errors.date = 'Please select a date within the next 30 days';
      }
    }

    // Time validation
    if (!values.customTime) {
      errors.customTime = 'Please select a time';
    }

    // Party size validation
    if (values.partySize < 1) {
      errors.partySize = 'Party size must be at least 1 person';
    } else if (values.partySize > 12) {
      errors.partySize = 'Party size cannot exceed 12 people';
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Reservation details:', values);
    
    // Save reservation data to parent component
    if (onReservationData) {
      onReservationData(values);
    }
    
    // Always scroll to payment form when reservation is confirmed
    scrollToRef(paymentFormRef);
    setSubmitting(false);
  };

  // Convert available times from API to time slots format
  const timeSlots = availableTimes.map(time => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const isPM = hour >= 12;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = isPM ? 'PM' : 'AM';
    return {
      value: time,
      label: `${displayHour}:${minutes} ${period}`
    };
  });

  const occasions = [
    'Birthday',
    'Anniversary',
    'Date Night',
    'Business Dinner',
    'Family Gathering',
    'Casual',
  ];

  const seatingAreas = ['Indoor', 'Outdoor', 'Indifferent'];

  const today = new Date();
  const beginningOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 20);

  const [lastSlotHour, lastSlotMinute] = timeSlots[timeSlots.length - 1].value.split(':').map(Number);
  const lastSlotTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), lastSlotHour, lastSlotMinute);

  const minSelectableDate = today > lastSlotTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) : beginningOfToday;

  // eslint-disable-next-line no-unused-vars
  const allowedTimes = new Set(timeSlots.map(slot => slot.value));

  const parseTimeString = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const formBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const inputFocusBorderColor = useColorModeValue('yellow.400', 'yellow.300');

  // Convert available times to Date objects for the time picker
  const specificTimes = availableTimes.map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes, 0, 0);
  });
  const CustomInput = React.forwardRef(({ value, onClick, onChange }, ref) => (
    <Input
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      variant="filled"
      focusBorderColor={inputFocusBorderColor}
      placeholder="Select a date"
      readOnly
    />
  ));

  return (
    <Box bg={bgColor} w="full">
      <HStack
        maxW="1200px"
        mx="auto"
        p={{ base: 4, md: 8 }}
        spacing={10}
        alignItems="stretch"
        flexDir={{ base: 'column', md: 'row' }}
        minH={{ md: '60vh' }}
      >
        <VStack
          w={{ base: '100%', md: '50%' }}
          spacing={8}
          alignItems="stretch"
        >
          <VStack
            as={Box}
            spacing={6}
            bg={formBgColor}
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            boxShadow="md"
          >
            <Heading as="h2" size="lg" color={textColor} fontWeight="600">
              Make a Reservation
            </Heading>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                <Form style={{ width: '100%' }}>
                  <VStack spacing={5}>
                    <FormControl>
                      <FormLabel
                        htmlFor="partySize"
                        fontWeight="medium"
                        color={labelColor}
                      >
                        Party Size: {values.partySize}{' '}
                        {values.partySize === 1 ? 'person' : 'people'}
                      </FormLabel>
                      <Slider
                        id="partySize"
                        name="partySize"
                        min={1}
                        max={12}
                        value={values.partySize}
                        onChange={(val) => setFieldValue('partySize', val)}
                        colorScheme="yellow"
                      >
                        <SliderTrack bg="yellow.100">
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={5}>
                          <Box color="yellow.400" />
                        </SliderThumb>
                      </Slider>
                      <HStack justifyContent="space-between" mt={1}>
                        <Text fontSize="xs" color="gray.500">
                          1
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          12
                        </Text>
                      </HStack>
                    </FormControl>

                    <Field name="fullName">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.fullName && touched.fullName}
                        >
                          <FormLabel
                            htmlFor="fullName"
                            fontWeight="medium"
                            color={labelColor}
                          >
                            Full Name *
                          </FormLabel>
                          <Input
                            {...field}
                            id="fullName"
                            placeholder="John Doe"
                            variant="filled"
                            focusBorderColor={inputFocusBorderColor}
                          />
                          <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="date">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.date && form.touched.date}>
                          <FormLabel
                            htmlFor="date"
                            fontWeight="medium"
                            color={labelColor}
                          >
                            Reservation Date *
                          </FormLabel>
                          <InputGroup zIndex="999">
                            <DatePicker
                              {...field}
                              id="date"
                              selected={field.value ? new Date(field.value) : null}
                              onChange={(val) => {
                                form.setFieldValue(field.name, val);
                                // Update available times when date changes
                                if (val) {
                                  dispatch({ type: 'UPDATE_TIMES', date: val });
                                }
                              }}
                              minDate={minSelectableDate}
                              maxDate={maxDateObj}
                              dateFormat="MMMM d, yyyy"
                              customInput={<CustomInput />}
                              wrapperClassName="date-picker-wrapper"
                            />
                            <InputRightElement pointerEvents="none">
                              <CalendarIcon color={labelColor} />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="customTime">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.customTime && form.touched.customTime}>
                          <FormLabel
                            htmlFor="customTime"
                            fontWeight="medium"
                            color={labelColor}
                          >
                            Reservation Time *
                          </FormLabel>
                          <InputGroup zIndex="998">
                            <DatePicker
                              {...field}
                              id="customTime"
                              selected={field.value ? new Date(`1970-01-01T${parseTimeString(field.value)}`) : null}
                              onChange={(val) => {
                                const formatted = val.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true});
                                form.setFieldValue(field.name, formatted);
                              }}
                              showTimeSelect={true}
                              showTimeSelectOnly={true}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              includeTimes={specificTimes}
                              customInput={<CustomInput />}
                              wrapperClassName="date-picker-wrapper"
                            />
                             <InputRightElement pointerEvents="none">
                              <TimeIcon color={labelColor} />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.customTime}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="occasion">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel
                            htmlFor="occasion"
                            fontWeight="medium"
                            color={labelColor}
                          >
                            Occasion
                          </FormLabel>
                          <Select
                            {...field}
                            id="occasion"
                            variant="filled"
                            focusBorderColor={inputFocusBorderColor}
                          >
                            {occasions.map((occasion) => (
                              <option key={occasion} value={occasion}>
                                {occasion}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="seatingArea">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel
                            htmlFor="seatingArea"
                            fontWeight="medium"
                            color={labelColor}
                          >
                            Seating
                          </FormLabel>
                          <Select
                            {...field}
                            id="seatingArea"
                            variant="filled"
                            focusBorderColor={inputFocusBorderColor}
                          >
                            {seatingAreas.map((area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      type="submit"
                      bg="yellow.400"
                      color="white"
                      isLoading={isSubmitting}
                      width="full"
                      size="lg"
                      mt={4}
                      _hover={{ bg: 'yellow.500' }}
                      _active={{ bg: 'yellow.600' }}
                    >
                      Confirm Reservation
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </VStack>

          <VStack
            ref={paymentFormRef}
            as={Box}
            spacing={6}
            bg={formBgColor}
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            boxShadow="md"
          >
            <Heading as="h2" size="lg" color={textColor} fontWeight="600">
              Payment Details
            </Heading>
            <Formik
              initialValues={{
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                nameOnCard: '',
              }}
              validate={(values) => {
                const errors = {};
                
                // Name on card validation
                if (!values.nameOnCard) {
                  errors.nameOnCard = 'Please enter the name on the card';
                } else if (typeof values.nameOnCard !== 'string') {
                  errors.nameOnCard = 'Invalid name format';
                } else if (values.nameOnCard.trim().length < 2) {
                  errors.nameOnCard = 'Please enter the name on the card';
                } else if (values.nameOnCard.trim().length > 50) {
                  errors.nameOnCard = 'Name must be less than 50 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(values.nameOnCard.trim())) {
                  errors.nameOnCard = 'Name can only contain letters and spaces';
                }
                
                // Card number validation
                if (!values.cardNumber) {
                  errors.cardNumber = 'Please enter a card number';
                } else {
                  // Convert to string if it's a number
                  const cardNumberStr = String(values.cardNumber);
                  const cardNum = cardNumberStr.replace(/\s/g, '');
                  
                  if (!/^\d{16}$/.test(cardNum)) {
                    errors.cardNumber = 'Please enter a valid 16-digit card number';
                  } else {
                    // Enhanced Luhn algorithm check
                    let sum = 0;
                    let shouldDouble = false;
                    
                    // Process digits from right to left
                    for (let i = cardNum.length - 1; i >= 0; i--) {
                      let digit = parseInt(cardNum[i]);
                      
                      if (shouldDouble) {
                        digit *= 2;
                        if (digit > 9) {
                          digit -= 9;
                        }
                      }
                      
                      sum += digit;
                      shouldDouble = !shouldDouble;
                    }
                    
                    if (sum % 10 !== 0) {
                      errors.cardNumber = 'Please enter a valid card number';
                    }
                    
                    // Additional validation: reject obvious test/fake numbers
                    const invalidPatterns = [
                      /^(\d)\1+$/, // All same digits (1111111111111111)
                      /^(0123456789|1234567890|9876543210|0987654321).*$/, // Sequential
                      /^1234.*$/, // Numbers starting with 1234
                      /^0000.*$/, // Numbers starting with 0000
                      /^(1111|2222|3333|4444|5555|6666|7777|8888|9999).*$/, // Repeating groups
                    ];
                    
                    const commonTestNumbers = [
                      '1234123412341234',
                      '1111111111111111', 
                      '4444444444444444',
                      '0000000000000000',
                      '1234567890123456'
                    ];
                    
                    const isInvalidPattern = invalidPatterns.some(pattern => pattern.test(cardNum));
                    const isTestNumber = commonTestNumbers.includes(cardNum);
                    
                    if (isInvalidPattern || isTestNumber) {
                      errors.cardNumber = 'Please enter a valid card number';
                    }
                  }
                }
                
                // Expiry date validation
                if (!values.expiryDate) {
                  errors.expiryDate = 'Please enter expiry date';
                } else if (!/^\d{2}\/\d{2}$/.test(values.expiryDate)) {
                  errors.expiryDate = 'Please enter expiry date as MM/YY';
                } else {
                  const [month, year] = values.expiryDate.split('/');
                  const currentDate = new Date();
                  const currentYear = currentDate.getFullYear() % 100;
                  const currentMonth = currentDate.getMonth() + 1;
                  
                  if (parseInt(month) < 1 || parseInt(month) > 12) {
                    errors.expiryDate = 'Please enter a valid month (01-12)';
                  } else if (parseInt(year) < currentYear || 
                           (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    errors.expiryDate = 'Card has expired';
                  }
                }
                
                // CVV validation
                if (!values.cvv) {
                  errors.cvv = 'Please enter CVV';
                } else {
                  const cvvStr = String(values.cvv);
                  if (!/^\d{3,4}$/.test(cvvStr)) {
                    errors.cvv = 'Please enter a valid 3 or 4-digit CVV';
                  }
                }
                
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log('Payment form submitted:', values);
                
                // Use the submitForm function passed as props for the complete booking submission
                if (submitForm) {
                  try {
                    const success = submitForm({
                      payment: values,
                      // You might want to include reservation details here too
                      timestamp: new Date().toISOString()
                    });
                    
                    if (success) {
                      console.log('Complete booking successfully submitted to API');
                      resetForm();
                      // Navigation will be handled by submitForm function
                    } else {
                      console.error('Failed to submit complete booking to API');
                      // Don't reset form on failure so user can retry
                    }
                  } catch (error) {
                    console.error('Error during form submission:', error);
                  } finally {
                    setSubmitting(false);
                  }
                } else {
                  // Fallback behavior if submitForm is not provided
                  console.log('No submitForm function provided, using fallback');
                  setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                    navigate('/confirmation');
                  }, 1000);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form style={{ width: '100%' }}>
                  <VStack spacing={5}>
                    <Field name="nameOnCard">
                      {({ field }) => (
                        <FormControl isInvalid={errors.nameOnCard && touched.nameOnCard}>
                          <FormLabel htmlFor="nameOnCard" fontWeight="medium" color={labelColor}>
                            Name on Card *
                          </FormLabel>
                          <Input
                            {...field}
                            id="nameOnCard"
                            placeholder="John Doe"
                            variant="filled"
                            focusBorderColor={inputFocusBorderColor}
                          />
                          <FormErrorMessage>{errors.nameOnCard}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="cardNumber">
                      {({ field }) => (
                        <FormControl isInvalid={errors.cardNumber && touched.cardNumber}>
                          <FormLabel htmlFor="cardNumber" fontWeight="medium" color={labelColor}>
                            Card Number *
                          </FormLabel>
                          <Input
                            {...field}
                            id="cardNumber"
                            placeholder="1234567890123456"
                            variant="filled"
                            focusBorderColor={inputFocusBorderColor}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                          <FormErrorMessage>{errors.cardNumber}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <HStack spacing={5} w="full">
                      <Field name="expiryDate">
                        {({ field }) => (
                          <FormControl isInvalid={errors.expiryDate && touched.expiryDate} flex={1}>
                            <FormLabel htmlFor="expiryDate" fontWeight="medium" color={labelColor}>
                              Expiry Date *
                            </FormLabel>
                            <Input
                              {...field}
                              id="expiryDate"
                              placeholder="MM/YY"
                              variant="filled"
                              focusBorderColor={inputFocusBorderColor}
                            />
                            <FormErrorMessage>{errors.expiryDate}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="cvv">
                        {({ field }) => (
                          <FormControl isInvalid={errors.cvv && touched.cvv} flex={1}>
                            <FormLabel htmlFor="cvv" fontWeight="medium" color={labelColor}>
                              CVV *
                            </FormLabel>
                            <Input
                              {...field}
                              id="cvv"
                              placeholder="123"
                              variant="filled"
                              focusBorderColor={inputFocusBorderColor}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength="4"
                            />
                            <FormErrorMessage>{errors.cvv}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>

                    <Button
                      type="submit"
                      bg="yellow.400"
                      color="white"
                      isLoading={isSubmitting}
                      width="full"
                      size="lg"
                      mt={4}
                      _hover={{ bg: 'yellow.500' }}
                      _active={{ bg: 'yellow.600' }}
                    >
                      Complete Payment
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </VStack>
        </VStack>

        <VStack
          className="images-section"
          w={{ base: '100%', md: '50%' }}
          spacing={6}
          alignItems="stretch"
          display={{ base: 'none', md: 'flex' }}
        >
          <Box className="image-container" flex={1} mt={10}>
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant Interior"
              objectFit="cover"
              w="90%"
              h="90%"
              borderRadius="md"
            />
          </Box>
          <Box className="image-container" flex={1}>
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
              alt="Outdoor Dining"
              objectFit="cover"
              w="90%"
              h="90%"
              borderRadius="md"
            />
          </Box>
          <Box className="image-container" flex={1}>
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Close up of a dish"
              objectFit="cover"
              w="90%"
              h="90%"
              borderRadius="md"
            />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

// Default props to handle cases where props are not provided
ReservationForm.defaultProps = {
  submitForm: null,
  onReservationData: null
};

export default ReservationForm;
