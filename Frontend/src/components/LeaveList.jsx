import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeavesByUserId } from '../redux/reducers/dataReducer';
import { Card, CardContent, Typography, CircularProgress, Box, Divider } from '@mui/material';
import dayjs from 'dayjs';

const filterLeavesByDateRange = (leaves, startDate, endDate) => {
  return leaves.filter(leave => {
    const leaveStartDate = dayjs(leave.startDate);
    const leaveEndDate = dayjs(leave.endDate);

    if (!startDate || !endDate) {
      // "Tüm Zamanlar" seçeneği için tüm izinleri döndür
      return true;
    }

    return (
      leaveStartDate.isBetween(startDate, endDate, null, '[]') ||
      leaveEndDate.isBetween(startDate, endDate, null, '[]') ||
      (leaveStartDate.isBefore(startDate) && leaveEndDate.isAfter(endDate))
    );
  });
};

const LeavesList = ({ userId, filterRange  }) => {
  const dispatch = useDispatch();
  const { leaves, status } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getLeavesByUserId(userId));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  const { start, end } = filterRange;
  const filteredLeaves = filterLeavesByDateRange(leaves, dayjs(start), dayjs(end));


  return (
    <Box sx={{ placeItems: 'center' }}>
      <Typography variant="h6" className='LeaveListTitle' sx={{fontWeight:'bold'}}>
        İzin Geçmişi: {filteredLeaves.reduce((acc, leave) => acc + leave.totalLeaveDays, 0)} Gün
      </Typography>
      <Divider sx={{ my: 2 }} />
      {filteredLeaves.length > 0 ? (
        filteredLeaves.map((leave) => (
          <Card key={leave.id} sx={{ mb: 1 }}>
            <CardContent className='LeaveListCard'>
              <Typography variant="subtitle1">
                Başlangıç: {dayjs(leave.startDate).format('DD-MM-YYYY')}
              </Typography>
              <Typography variant="subtitle1">
                Bitiş: {dayjs(leave.endDate).format('DD-MM-YYYY')}
              </Typography>
              <Typography variant="subtitle1"sx={{fontWeight:'bold'}} >
                Toplam İzin: {leave.totalLeaveDays} gün
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>İzin bulunmamaktadır.</Typography>
      )}
    </Box>
  );
};

export default LeavesList;