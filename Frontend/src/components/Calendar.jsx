import React, { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';
import './Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, saveGlobalData } from '../redux/reducers/dataReducer';
import LogoutButton from './LogoutButton';
import LeavesList from './LeaveList';
import PersonIcon from '@mui/icons-material/Person';

const holidays2024 = [
  dayjs('2024-01-01'), // Yeni Yıl
  dayjs('2024-04-10'), // Ramazan Bayramı - 1. gün
  dayjs('2024-04-11'), // Ramazan Bayramı - 2. gün
  dayjs('2024-04-12'), // Ramazan Bayramı - 3. gün
  dayjs('2024-04-23'), // Ulusal Egemenlik ve Çocuk Bayramı
  dayjs('2024-05-01'), // Emek ve Dayanışma Günü
  dayjs('2024-05-19'), // Atatürk'ü Anma Gençlik ve Spor Bayramı
  dayjs('2024-07-15'), // Demokrasi ve Milli Birlik Günü
  dayjs('2024-08-30'), // Zafer Bayramı
  dayjs('2024-10-29'), // Cumhuriyet Bayramı
  dayjs('2024-06-16'), // Kurban Bayramı - 1. gün
  dayjs('2024-06-17'), // Kurban Bayramı - 2. gün
  dayjs('2024-06-18'), // Kurban Bayramı - 3. gün
  dayjs('2024-06-19'), // Kurban Bayramı - 4. gün

];

const isWeekend = (date) => {
  const day = date.day();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

const isHoliday = (date) => {
  return holidays2024.some(holiday => holiday.isSame(date, 'day'));
};

const dateRanges = [
  { label: 'Geçen Hafta', start: dayjs().subtract(1, 'week').startOf('week'), end: dayjs().subtract(1, 'week').endOf('week') },
  { label: 'Bu Hafta', start: dayjs().startOf('week'), end: dayjs().endOf('week') },
  { label: 'Bu Ay', start: dayjs().startOf('month'), end: dayjs().endOf('month') },
  { label: 'Son 3 Ay', start: dayjs().subtract(3, 'month').startOf('month'), end: dayjs() },
  { label: 'Bu Yıl', start: dayjs().startOf('year'), end: dayjs() },
  { label: 'Geçen Yıl', start: dayjs().subtract(1, 'year').startOf('year'), end: dayjs().subtract(1, 'year').endOf('year') },
  { label: 'Tüm Zamanlar', start: null, end: null }
];


function Calendar() {
  const [isStartDateSelected, setIsStartDateSelected] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [totalLeaveDays, setTotalLeaveDays] = useState(0);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRanges[2]);

  const dispatch = useDispatch();
  const { userId, userName } = useSelector((state) => state.auth);

  const handleRangeChange = (event) => {
    const range = dateRanges.find(r => r.label === event.target.value);
    setSelectedRange(range);
  };

  const handleDateChange = (newDate) => {
    if (isStartDateSelected) {
      setStartDate(newDate);
      if (newDate.isAfter(endDate)) {
        setEndDate(newDate);
      }
    } else {
      if (newDate.isAfter(startDate)) {
        setEndDate(newDate);
      }
      setSelectionComplete(true);
    }
    setIsStartDateSelected(!isStartDateSelected);
  };

  const calculateDifference = (startDate, endDate) => {
    const totalDays = endDate.diff(startDate, 'day');
    let nonWorkingDays = 0;
    for (let currentDate = startDate.clone(); currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day'); currentDate = currentDate.add(1, 'day')) {
      if (isWeekend(currentDate) || isHoliday(currentDate)) {
        nonWorkingDays++;
      }
    }
    const totalValid = (totalDays - nonWorkingDays);
    if (totalValid < 0) {
      return 0;
    }
    return totalValid;
  }

  const shouldDisableDate = (date) => {
    return (
      isWeekend(date) ||
      isHoliday(date) ||
      (!isStartDateSelected && date.isBefore(startDate, 'day')) ||
      date.isBefore(new Date(), 'day') // Bugünden önceki tarihleri devre dışı bırak
    );
  };

  const resetCalendar = () => {
    setStartDate(dayjs());
    setEndDate(dayjs());
    setSelectionComplete(false);
    setIsStartDateSelected(true);
    setTotalLeaveDays(0);
  }

  useEffect(() => {
    if (startDate && endDate) {
      const validDays = calculateDifference(startDate, endDate);
      setTotalLeaveDays(validDays);
    }
  }, [startDate, endDate]);


  const handleSave = () => {
    const data = { startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD'), totalLeaveDays, userId: userId };
    dispatch(saveData(data));
    dispatch(saveGlobalData(data));
    console.log('Veriler kaydedildi:', data);
  };

  return (
    <div>
      <h1 className='userNameTitle'>
        <PersonIcon fontSize="large"/> {userName}
      </h1>
      <Box sx={{ display: 'flex', marginRight: 40 }}>
        <Box sx={{ flex: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className='customBox'>
              {!selectionComplete && (
                <Typography
                  variant="h6"
                  className="typography-main-title"
                  style={{ background: isStartDateSelected ? 'lightgreen' : 'orangered' }}
                >
                  {isStartDateSelected ? 'İzin Başlangıç Tarihi Seçin' : 'İzin Bitiş Tarihi Seçin'}
                </Typography>
              )}

              <DateCalendar
                value={isStartDateSelected ? startDate : endDate}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                sx={{
                  "& .MuiDayCalendar-weekDayLabel[data-value='Saturday']": {
                    color: 'red'
                  }
                }}
                disabled={selectionComplete}
              />

              <Typography variant="h6" className='typography-title'>
                Başlangıç Tarihi: {startDate.format('DD-MM-YYYY')}
              </Typography>

              <Typography variant="h6" className='typography-title'>
                Bitiş Tarihi: {endDate.format('DD-MM-YYYY')}
              </Typography>

              <Typography variant="h6" className='typography-total'>
                Toplam İzin: {totalLeaveDays}
              </Typography>
            </Box>
            <div className='buttons-div'>
              <div>
                <button className='button-Reset' onClick={resetCalendar}>Sıfırla</button>
                <button className='button-Save' onClick={handleSave}>Kaydet</button>
              </div>
              <div><LogoutButton /></div>
            </div>
          </LocalizationProvider>
        </Box>
        <Box
          sx={{ width: '250px', ml: 1, display: 'flex', flexDirection: 'column' }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tarih Aralığı Seçin</InputLabel>
            <Select
              value={selectedRange.label}
              onChange={handleRangeChange}
              renderValue={(value) => value}
            >

              {dateRanges.map((range) => (
                <MenuItem key={range.label} value={range.label}>
                  <CalendarMonthIcon sx={{ mr: 2 }} />
                  {range.label}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
          <Box
            className='customBox leavesBox'
            sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
          >
            <LeavesList userId={userId} filterRange={selectedRange} />
          </Box>
        </Box>
      </Box> </div>
  );
}

export default Calendar;