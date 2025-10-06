import React, { useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/DatePicker.css';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
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
  AspectRatio,
  Image,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const ReservationForm = () => {
  const paymentFormRef = useRef(null);

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

    if (!values.fullName || values.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name';
    }

    if (!values.date) {
      errors.date = 'Please select a date';
    }

    if (!values.customTime) {
      errors.customTime = 'Please select a time';
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Reservation details:', values);
    scrollToRef(paymentFormRef);
    setSubmitting(false);
  };

  const timeSlots = [
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '21:30', label: '9:30 PM' },
  ];

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

  const minTime = new Date(`1970-01-01T${timeSlots[0].value}`);
  const maxTime = new Date(`1970-01-01T${timeSlots[timeSlots.length - 1].value}`);

  const allowedTimes = new Set(timeSlots.map(slot => slot.value));
  const filterTime = (time) => {
    const timeString = time.toTimeString().slice(0, 5);
    return allowedTimes.has(timeString);
  };

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

  const specificTimes = [
    new Date(1970, 0, 1, 17, 0, 0, 0),
    new Date(1970, 0, 1, 17, 30, 0, 0),
    new Date(1970, 0, 1, 18, 0, 0, 0),
    new Date(1970, 0, 1, 18, 30, 0, 0),
    new Date(1970, 0, 1, 19, 0, 0, 0),
    new Date(1970, 0, 1, 19, 30, 0, 0),
    new Date(1970, 0, 1, 20, 0, 0, 0),
    new Date(1970, 0, 1, 20, 30, 0, 0),
    new Date(1970, 0, 1, 21, 0, 0, 0),
    new Date(1970, 0, 1, 21, 30, 0, 0),
  ];
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
                              onChange={(val) => form.setFieldValue(field.name, val)}
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
                if (!values.cardNumber || !/^\d{16}$/.test(values.cardNumber)) {
                  errors.cardNumber = 'Please enter a valid 16-digit card number';
                }
                if (!values.expiryDate || !/^\d{2}\/\d{2}$/.test(values.expiryDate)) {
                  errors.expiryDate = 'Please enter expiry date as MM/YY';
                }
                if (!values.cvv || !/^\d{3}$/.test(values.cvv)) {
                  errors.cvv = 'Please enter a valid 3-digit CVV';
                }
                if (!values.nameOnCard || values.nameOnCard.trim().length < 2) {
                  errors.nameOnCard = 'Please enter the name on the card';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log('Payment submitted:', values);
                setTimeout(() => {
                  alert('Payment processed successfully!');
                  resetForm();
                  setSubmitting(false);
                }, 1000);
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
                            type="number"
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
                              type="number"
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
          spacing={6} // Ensure no intrinsic spacing
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

export default ReservationForm;
