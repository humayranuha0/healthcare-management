const dotenv=require("dotenv");
dotenv.config();


const mongoose= require("mongoose");

const express = require('express');
const cors = require('cors');
const path = require('path');


const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const password=process.env.Admin_Password;

const createAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    
    if (!adminExists) {
      
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await User.create({
        name: 'System Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin created!');
    }
  } catch (error) {
    console.log('Error creating admin:', error);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected!");
    createAdminAccount(); 
  })
  .catch(err => console.log("Error here:", err));


const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname+'/dist'));




const doctorSchema = new mongoose.Schema({
  name:String,
  specialty: String,
  experience:String,
  schedule: String,
  fee:Number,
  status: String,
  image:String,
  phone:Number
  
 
});
const Doctor =  mongoose.model("Doctor",doctorSchema);
const appointmentSchema = new mongoose.Schema({
 fullName: { type: String, required: true },
  phone: { type: String, required: true },
  doctor: { type: String, default: "Dr. Sarah Jenkins" },
  service: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  prescription: {
    medicines: { type: String, default: '' },
    advice: { type: String, default: '' }
  }
  
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  role:{type:String,enum:['patient','doctor','admin'],default:'patient'},
createdAt: { type: Date, default: Date.now }
});
const User= mongoose.model("User",userSchema);


app.get("/api/admin", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});


app.post("/api/admin", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: "Doctor added successfully!", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Failed to add doctor", error: error.message });
  }
});

app.delete("/api/admin/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

app.post("/api/admin/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to update" });
  }
});
app.get("/api/appointments", async(req,res)=>{
  try {
    const newAppointment = await Appointment.find();
    res.json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
})
app.post('/api/appointments', async (req, res) => {
  try {
    const { fullName, phone, service, date, message, doctor, doctorName } = req.body;

    if (!fullName || !phone || !date) {
      return res.status(400).json({ message: 'Full Name, Phone, and Date are required.' });
    }

    const newAppointment = new Appointment({
      fullName,
      phone,
      service,
      date,
      message,
      doctor: doctorName || doctor, 
      status: 'Pending',
      prescription: { medicines: '', advice: '' }
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!', data: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, prescription } = req.body;

  
    const updateData = {};
    if (status) updateData.status = status;
    if (prescription) updateData.prescription = prescription;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after' } 
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
});
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find(); 
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
  }
});
app.put('/api/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { isAvailable: isAvailable },
      { returnDocument: 'after' }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/appointments/doctor/:doctorId', async (req, res) => {
  const doctorId = req.params.doctorId;
  const appointments = await Appointment.find({ doctorId: doctorId }).toArray();
  res.send(appointments);
});




app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: role 
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.log("Backend Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


app.get('/api/patient/appointments', async (req, res) => {
  try {
    
    const appointments = await Appointment.find({});

    res.status(200).json(appointments || []);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(200).json([]);
  }
});
app.get("/api/contact", async(req,res)=>{
  try {
    const newMessage = await Message.find();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messege" });
  }
})

app.post('/api/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(3000,()=>{
     console.log('Glowdent Backend Server is Running!');
})


