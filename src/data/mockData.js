export const mockCameras = [
  { id: 101, name: 'Front Gate', location: 'North entrance', brand: 'Hikvision', analytics: ['LPR', 'Speed', 'Intrusion'] },
  { id: 102, name: 'Car Park', location: 'South lot', brand: 'Dahua', analytics: ['Count', 'Motion', 'Vehicle'] },
  { id: 103, name: 'Main Entrance', location: 'Reception', brand: 'Axis', analytics: ['Person', 'Alarm', 'Access'] },
  { id: 104, name: 'Perimeter East', location: 'Boundary fence', brand: 'Uniview', analytics: ['Line crossing', 'Track', 'Motion'] }
];

export const deviceTypes = ['Camera', 'Speaker', 'Intercom', 'Alarm', 'Access Controller', 'NVR', 'Gateway'];

export const mockDevices = [
  { id: 1, name: 'Front Gate Camera', type: 'Camera', ip: '192.168.1.21', model: 'Hikvision DS-2CD2142FWD-I', status: 'Online', username: 'admin', password: '••••••', notes: 'Main gate monitoring' },
  { id: 2, name: 'Lobby Speaker', type: 'Speaker', ip: '192.168.1.42', model: 'Axis Speaker', status: 'Online', username: 'admin', password: '••••••', notes: 'Site announcement' },
  { id: 3, name: 'Reception Intercom', type: 'Intercom', ip: '192.168.1.67', model: 'Aiphone', status: 'Offline', username: 'service', password: '••••••', notes: 'Visitor entry check' },
  { id: 4, name: 'Perimeter Alarm', type: 'Alarm', ip: '192.168.1.89', model: 'Bosch B4512', status: 'Online', username: 'bosch', password: '••••••', notes: 'Fence alarm panel' }
];

export const mockEvents = [
  { id: 1, time: '08:14:22', camera: 'Front Gate', event: 'Line crossing', result: 'Verified' },
  { id: 2, time: '08:32:10', camera: 'Car Park', event: 'Speed alert', result: 'Escalated' },
  { id: 3, time: '08:41:55', camera: 'Main Entrance', event: 'Person detected', result: 'Clear' },
  { id: 4, time: '09:02:03', camera: 'Perimeter East', event: 'Plate read', result: 'Watch-list match' },
  { id: 5, time: '09:11:41', camera: 'Front Gate', event: 'Vehicle count', result: 'Normal' }
];

export const mockAlarms = [
  { id: 331, type: 'Speed violation', location: 'Car Park', status: 'Handling', sop: ['Verify live feed', 'Check plate and camera context', 'Confirm speed threshold'] },
  { id: 332, type: 'Intrusion alert', location: 'Main Entrance', status: 'New', sop: ['Review motion event', 'Assess risk', 'Escalate if genuine'] },
  { id: 333, type: 'Watch-list vehicle', location: 'Perimeter East', status: 'Cleared', sop: ['Compare with watch list', 'Log reference number', 'Clear and archive evidence'] }
];

export const metrics = [
  { label: 'Live cameras', value: '92%', trend: '+3.4% vs yesterday' },
  { label: 'Open alarms', value: '7', trend: '2 require response' },
  { label: 'Verified events', value: '124', trend: '+9 today' },
  { label: 'Dispatch-ready', value: '3', trend: '1 under review' }
];
