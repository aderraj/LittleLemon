import React from 'react';
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
  const initialValues = {
    fullName: '',
    partySize: 2,
    occasion: 'Casual',
    date: '',
    customTime: '17:00',
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

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    setTimeout(() => {
      alert('Reservation submitted successfully!');
      resetForm();
      setSubmitting(false);
    }, 1000);
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

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const formBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const inputFocusBorderColor = useColorModeValue('yellow.400', 'yellow.300');

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
        alignItems="flex-start"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VStack
          as={Box}
          w={{ base: '100%', md: '50%' }}
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
                            selected={field.value ? new Date(`1970-01-01T${field.value}`) : null}
                            onChange={(val) => {
                              const timeString = val.toTimeString().slice(0, 5);
                              form.setFieldValue(field.name, timeString);
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            filterTime={filterTime}
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

                  <HStack w="full" spacing={4}>
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
                            placeholder="Select"
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
                            placeholder="Select"
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
                    Confirm Reservation
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>

        <VStack
          w={{ base: '100%', md: '50%' }}
          spacing={4}
          alignItems="stretch"
          display={{ base: 'none', md: 'flex' }}
        >
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant Interior"
              borderRadius="lg"
              objectFit="cover"
            />
          </AspectRatio>
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
              alt="Outdoor Dining"
              borderRadius="lg"
              objectFit="cover"
            />
          </AspectRatio>
          <AspectRatio ratio={16 / 9}>
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Close up of a dish"
              borderRadius="lg"
              objectFit="cover"
            />
          </AspectRatio>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ReservationForm;
