import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const classService = {
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "subject_c"}},
          {"field": {"Name": "teacher_c"}},
          {"field": {"Name": "schedule_c"}},
          {"field": {"Name": "students_c"}},
          {"field": {"Name": "room_c"}},
          {"field": {"Name": "max_capacity_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('class_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        name: item.name_c || item.Name,
        subject: item.subject_c,
        teacher: item.teacher_c,
        schedule: item.schedule_c ? item.schedule_c.split('\n') : [],
        students: item.students_c ? item.students_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [],
        room: item.room_c,
        maxCapacity: parseInt(item.max_capacity_c) || 0
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to load classes");
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "subject_c"}},
          {"field": {"Name": "teacher_c"}},
          {"field": {"Name": "schedule_c"}},
          {"field": {"Name": "students_c"}},
          {"field": {"Name": "room_c"}},
          {"field": {"Name": "max_capacity_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('class_c', parseInt(id), params);
      
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
          name: item.name_c || item.Name,
          subject: item.subject_c,
          teacher: item.teacher_c,
          schedule: item.schedule_c ? item.schedule_c.split('\n') : [],
          students: item.students_c ? item.students_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [],
          room: item.room_c,
          maxCapacity: parseInt(item.max_capacity_c) || 0
        };
      }

      return null;
    } catch (error) {
      console.error(`Error fetching class ${id}:`, error);
      toast.error("Failed to load class");
      return null;
    }
  },

  async create(classData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: classData.name_c || classData.name,
          name_c: classData.name_c || classData.name,
          subject_c: classData.subject_c || classData.subject,
          teacher_c: classData.teacher_c || classData.teacher,
          schedule_c: Array.isArray(classData.schedule) ? classData.schedule.join('\n') : (classData.schedule_c || ""),
          students_c: Array.isArray(classData.students) ? classData.students.join(',') : (classData.students_c || ""),
          room_c: classData.room_c || classData.room,
          max_capacity_c: parseInt(classData.max_capacity_c || classData.maxCapacity) || 0,
          Tags: classData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('class_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} class records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Class created successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create class");
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  async update(id, classData) {
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
          Name: classData.name_c || classData.name,
          name_c: classData.name_c || classData.name,
          subject_c: classData.subject_c || classData.subject,
          teacher_c: classData.teacher_c || classData.teacher,
          schedule_c: Array.isArray(classData.schedule) ? classData.schedule.join('\n') : (classData.schedule_c || ""),
          students_c: Array.isArray(classData.students) ? classData.students.join(',') : (classData.students_c || ""),
          room_c: classData.room_c || classData.room,
          max_capacity_c: parseInt(classData.max_capacity_c || classData.maxCapacity) || 0,
          Tags: classData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord('class_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} class records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Class updated successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update class");
    } catch (error) {
      console.error("Error updating class:", error);
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

      const response = await apperClient.deleteRecord('class_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} class records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Class deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Failed to delete class");
      return false;
    }
  }
};