import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const attendanceService = {
  async getAll() {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c,
        date: item.date_c,
        status: item.status_c,
        notes: item.notes_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance");
      return [];
    }
  },

  async getById(id) {
    await delay(200);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('attendance_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      // Transform data to match expected format
      const item = response.data;
      if (item) {
        return {
          ...item,
          studentId: item.student_id_c?.Id || item.student_id_c,
          classId: item.class_id_c?.Id || item.class_id_c,
          date: item.date_c,
          status: item.status_c,
          notes: item.notes_c
        };
      }

      return null;
    } catch (error) {
      console.error(`Error fetching attendance ${id}:`, error);
      toast.error("Failed to load attendance record");
      return null;
    }
  },

  async getByStudentId(studentId) {
    await delay(250);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c,
        date: item.date_c,
        status: item.status_c,
        notes: item.notes_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching attendance by student ID:", error);
      toast.error("Failed to load student attendance");
      return [];
    }
  },

  async getByClassId(classId) {
    await delay(250);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "class_id_c", "Operator": "EqualTo", "Values": [parseInt(classId)]}],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c,
        date: item.date_c,
        status: item.status_c,
        notes: item.notes_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching attendance by class ID:", error);
      toast.error("Failed to load class attendance");
      return [];
    }
  },

  async getByDateRange(startDate, endDate) {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "Tags"}}
        ],
        whereGroups: [{
          "operator": "AND",
          "subGroups": [
            {"conditions": [{"fieldName": "date_c", "operator": "GreaterThanOrEqualTo", "values": [startDate]}], "operator": ""},
            {"conditions": [{"fieldName": "date_c", "operator": "LessThanOrEqualTo", "values": [endDate]}], "operator": ""}
          ]
        }],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c,
        date: item.date_c,
        status: item.status_c,
        notes: item.notes_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching attendance by date range:", error);
      toast.error("Failed to load attendance for date range");
      return [];
    }
  },

  async create(attendanceData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${attendanceData.student_id_c || attendanceData.studentId} - ${attendanceData.date_c || attendanceData.date}`,
          student_id_c: parseInt(attendanceData.student_id_c || attendanceData.studentId),
          class_id_c: parseInt(attendanceData.class_id_c || attendanceData.classId),
          date_c: attendanceData.date_c || attendanceData.date || new Date().toISOString().split('T')[0],
          status_c: attendanceData.status_c || attendanceData.status || "present",
          notes_c: attendanceData.notes_c || attendanceData.notes || "",
          Tags: attendanceData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} attendance records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Attendance recorded successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create attendance record");
    } catch (error) {
      console.error("Error creating attendance:", error);
      throw error;
    }
  },

  async update(id, attendanceData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${attendanceData.student_id_c || attendanceData.studentId} - ${attendanceData.date_c || attendanceData.date}`,
          student_id_c: parseInt(attendanceData.student_id_c || attendanceData.studentId),
          class_id_c: parseInt(attendanceData.class_id_c || attendanceData.classId),
          date_c: attendanceData.date_c || attendanceData.date,
          status_c: attendanceData.status_c || attendanceData.status,
          notes_c: attendanceData.notes_c || attendanceData.notes,
          Tags: attendanceData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} attendance records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Attendance updated successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update attendance record");
    } catch (error) {
      console.error("Error updating attendance:", error);
      throw error;
    }
  },

  async delete(id) {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} attendance records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Attendance record deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting attendance:", error);
      toast.error("Failed to delete attendance record");
      return false;
    }
  }
};