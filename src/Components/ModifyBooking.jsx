import React, { useState, useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/DatePicker.css';
import { CalendarIcon, TimeIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useBookings } from '../contexts/BookingContext';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  useToast,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Hero from './Hero';

const fetchAPI = (date) => {
  if (typeof window.fetchAPI === 'function') {
    return window.fetchAPI(date);
  }
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

const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.date);
    default:
      return state;
  }
};

const ModifyBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBooking } = useBookings();
  const toast = useToast();
  
  const [booking, setBooking] = useState(null);
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const formBgColor = useColorModeValue('white', 'gray.700');
  const inputFocusBorderColor = useColorModeValue('yellow.400', 'yellow.300');

  useEffect(() => {
    const foundBooking = bookings.find(b => b.id === parseInt(bookingId));
    if (foundBooking) {
      setBooking(foundBooking);
      const dateObj = new Date(foundBooking.date);
      dispatch({ type: 'UPDATE_TIMES', date: dateObj });
    }
  }, [bookingId, bookings]);

  const handleCancel = () => {
    navigate('/bookings');
  };

  if (!booking) {
    return (
      <>
        <Hero
          title="Modify Booking"
          subtitle="Update Your Reservation"
          description="Make changes to your existing reservation"
        />
        <Box bg={bgColor} py={8}>
          <HStack maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
            <Alert status="error">
              <AlertIcon />
              Booking not found. Please check your booking ID and try again.
            </Alert>
          </HStack>
        </Box>
      </>
    );
  }

  const parseBookingDate = (dateString) => {
    try {
      return new Date(dateString);
    } catch {
      return new Date();
    }
  };

  const parseTimeString = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const occasions = [
    'Birthday',
    'Anniversary',
    'Date Night',
    'Business Dinner',
    'Family Gathering',
    'Casual',
  ];

  const seatingAreas = ['Indoor', 'Outdoor', 'Indifferent'];

  const specificTimes = availableTimes.map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes, 0, 0);
  });

  const today = new Date();
  const beginningOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 20);

  const [lastSlotHour, lastSlotMinute] = availableTimes.length > 0 
    ? availableTimes[availableTimes.length - 1].split(':').map(Number)
    : [21, 30];
  const lastSlotTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), lastSlotHour, lastSlotMinute);
  const minSelectableDate = today > lastSlotTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) : beginningOfToday;

  const initialValues = {
    fullName: booking.fullName || '',
    partySize: booking.guests || 2,
    occasion: booking.occasion || 'Casual',
    date: parseBookingDate(booking.date),
    customTime: booking.time || '5:00 PM',
    seatingArea: booking.seatingArea || 'Indifferent',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(values.date);
      const today = new Date();
      const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      if (selectedDate < today.setHours(0,0,0,0)) {
        errors.date = 'Please select a future date';
      } else if (selectedDate > maxDate) {
        errors.date = 'Please select a date within the next 30 days';
      }
    }

    if (!values.customTime) {
      errors.customTime = 'Please select a time';
    }

    if (values.partySize < 1) {
      errors.partySize = 'Party size must be at least 1 person';
    } else if (values.partySize > 12) {
      errors.partySize = 'Party size cannot exceed 12 people';
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Updated reservation details:', values);
    
    const formattedDate = values.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const updatedBooking = {
      ...booking,
      date: formattedDate,
      time: values.customTime,
      guests: values.partySize,
      occasion: values.occasion,
      seatingArea: values.seatingArea,
    };

    updateBooking(booking.id, updatedBooking);
    
    toast({
      title: "Booking Updated",
      description: `Booking ${booking.bookingNumber} has been successfully updated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setSubmitting(false);
    navigate('/bookings');
  };

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
      color="var(--highlight-dark)"
      fontFamily={'var(--font-body)'}
      borderRadius="var(--border-radius)"
      bg="var(--highlight-white)"
      _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
    />
  ));

  return (
    <>
      <Hero
        title="Modify Booking"
        subtitle="Update Your Reservation"
        description={`Modify booking ${booking.bookingNumber}`}
      />
      <Box w="full">
        <HStack
            maxW="1636px"
            mx="auto"
            my={{ base: "30px", md: "60px" }}
            px={{ base: "15px", md: "20px" }}               
            spacing={{ base: 6, md: 10 }}
            alignItems="stretch"
            flexDir={{ base: 'column', md: 'row' }}
            minH={{ md: '60vh' }}
        >
          <VStack
            w={{ base: '100%', md: '50%' }}
            spacing={8}
            alignItems="stretch"
            justifyContent="center"
          >
            <VStack
              as={Box}
              spacing={6}
              bg={formBgColor}
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              boxShadow="md"
            >
              <VStack spacing={2} align="start" w="full">
                <Heading 
                  as="h1" 
                  size={{ base: "md", md: "lg" }} 
                  color={'var(--primary-green)'} 
                  fontWeight="800" 
                  textTransform={'uppercase'}
                >
                  Update Reservation Details
                </Heading>
                <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                  Booking Number: {booking.bookingNumber}
                </Text>
              </VStack>
              
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
                          fontWeight="bold"
                          fontFamily={'var(--font-heading)'}
                          fontSize={'var(--type-medium)'}
                          color={'var(--primary-green)'}
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
                        >
                          <SliderTrack bg="var(--secondary-beige)">
                            <SliderFilledTrack bg="var(--primary-yellow)" />
                          </SliderTrack>
                          <SliderThumb
                            boxSize={5}
                            bg="var(--primary-green)"
                            border="2px solid var(--highlight-white)"
                            _hover={{ transform: 'scale(1.1)', bg: 'var(--primary-green)' }}
                          >
                            <Box />
                          </SliderThumb>
                        </Slider>
                        <HStack justifyContent="space-between" mt={1}>
                          <Text fontSize="m" color="var(--highlight-dark)">
                            1
                          </Text>
                          <Text fontSize="m" color="var(--highlight-dark)">
                            12
                          </Text>
                        </HStack>
                      </FormControl>

                      <Field name="date">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.date && form.touched.date}>
                            <FormLabel
                              htmlFor="date"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
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
                                  if (val)
                                    dispatch({ type: 'UPDATE_TIMES', date: val });
                                }}
                                minDate={minSelectableDate}
                                maxDate={maxDateObj}
                                dateFormat="MMMM d, yyyy"
                                customInput={<CustomInput />}
                                wrapperClassName="date-picker-wrapper"
                              />
                              <InputRightElement pointerEvents="none">
                                <CalendarIcon color="var(--highlight-dark)" />
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
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
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
                                <TimeIcon color="var(--highlight-dark)" />
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{form.errors.customTime}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="occasion">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel
                              htmlFor="occasion"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
                            >
                              Occasion
                            </FormLabel>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                variant="filled"
                                bg="var(--highlight-white)"
                                color="var(--highlight-dark)"
                                fontFamily="var(--font-body)"
                                fontWeight="normal"
                                textAlign="left"
                                w="full"
                                justifyContent="space-between"
                                borderRadius="var(--border-radius)"
                                _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                                _focus={{
                                  borderColor: "var(--primary-yellow)",
                                  boxShadow: "0 0 0 1px var(--primary-yellow)"
                                }}
                              >
                                {field.value || 'Select occasion'}
                              </MenuButton>
                              <MenuList
                                bg="var(--highlight-white)"
                                border="none"
                                boxShadow="lg"
                                borderRadius="var(--border-radius)"
                              >
                                {occasions.map((occasion) => (
                                  <MenuItem
                                    key={occasion}
                                    onClick={() => form.setFieldValue('occasion', occasion)}
                                    bg="var(--highlight-white)"
                                    color="var(--highlight-dark)"
                                    fontSize="var(--type-base-rem)"
                                    fontWeight="normal"
                                    fontFamily="var(--font-body)"
                                    _hover={{
                                      bg: "var(--primary-yellow)",
                                      color: "var(--highlight-dark)"
                                    }}
                                    _focus={{
                                      bg: "var(--primary-yellow)",
                                      color: "var(--highlight-dark)"
                                    }}
                                  >
                                    {occasion}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="seatingArea">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel
                              htmlFor="seatingArea"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
                            >
                              Seating
                            </FormLabel>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                variant="filled"
                                bg="var(--highlight-white)"
                                color="var(--highlight-dark)"
                                fontFamily="var(--font-body)"
                                fontWeight="normal"
                                textAlign="left"
                                w="full"
                                justifyContent="space-between"
                                borderRadius="var(--border-radius)"
                                _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                                _focus={{
                                  borderColor: "var(--primary-yellow)",
                                  boxShadow: "0 0 0 1px var(--primary-yellow)"
                                }}
                              >
                                {field.value || 'Select seating'}
                              </MenuButton>
                              <MenuList
                                bg="var(--highlight-white)"
                                border="none"
                                boxShadow="lg"
                                borderRadius="var(--border-radius)"
                              >
                                {seatingAreas.map((area) => (
                                  <MenuItem
                                    key={area}
                                    onClick={() => form.setFieldValue('seatingArea', area)}
                                    bg="var(--highlight-white)"
                                    color="var(--highlight-dark)"
                                    fontSize="var(--type-base-rem)"
                                    fontWeight="normal"
                                    fontFamily="var(--font-body)"
                                    _hover={{
                                      bg: "var(--primary-yellow)",
                                      color: "var(--highlight-dark)"
                                    }}
                                    _focus={{
                                      bg: "var(--primary-yellow)",
                                      color: "var(--highlight-dark)"
                                    }}
                                  >
                                    {area}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </FormControl>
                        )}
                      </Field>

                      <HStack spacing={3} w="full" pt={4} flexWrap={{ base: "wrap", sm: "nowrap" }}>
                        <Button
                          type="submit"
                          bg="var(--primary-yellow)"
                          borderRadius={'var(--border-radius)'}
                          color="var(--highlight-dark)"
                          isLoading={isSubmitting}
                          size={{ base: "md", md: "lg" }}
                          flex={1}
                          minW={{ base: "full", sm: "150px" }}
                          _hover={{ bg: 'yellow.500' }}
                          _active={{ bg: 'yellow.600' }}
                        >
                          Update
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size={{ base: "md", md: "lg" }}
                          flex={1}
                          minW={{ base: "full", sm: "150px" }}
                          onClick={handleCancel}
                          borderColor="var(--highlight-dark)"
                          borderRadius={'var(--border-radius)'}
                          color="var(--highlight-dark)"
                          _hover={{ bg: 'gray.100' }}
                        >
                          Cancel
                        </Button>
                      </HStack>
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
                w="full"
                h="200px"
                borderRadius="md"
              />
            </Box>
            <Box className="image-container" flex={1}>
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
                alt="Outdoor Dining"
                objectFit="cover"
                w="full"
                h="200px"
                borderRadius="md"
              />
            </Box>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default ModifyBooking;