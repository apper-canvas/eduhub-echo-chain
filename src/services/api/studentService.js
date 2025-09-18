import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const studentService = {
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "parent_contact_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "parent_contact_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('student_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      toast.error("Failed to load student");
      return null;
    }
  },

  async create(studentData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${studentData.first_name_c || studentData.firstName} ${studentData.last_name_c || studentData.lastName}`,
          first_name_c: studentData.first_name_c || studentData.firstName,
          last_name_c: studentData.last_name_c || studentData.lastName,
          email_c: studentData.email_c || studentData.email,
          phone_c: studentData.phone_c || studentData.phone,
          grade_c: studentData.grade_c || studentData.grade,
          enrollment_date_c: studentData.enrollment_date_c || studentData.enrollmentDate || new Date().toISOString().split('T')[0],
          photo_c: studentData.photo_c || studentData.photo || "",
          address_c: studentData.address_c || studentData.address || "",
          parent_contact_c: studentData.parent_contact_c || studentData.parentContact || "",
          status_c: studentData.status_c || studentData.status || "Active",
          Tags: studentData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} student records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Student created successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create student");
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },

  async update(id, studentData) {
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
          Name: `${studentData.first_name_c || studentData.firstName} ${studentData.last_name_c || studentData.lastName}`,
          first_name_c: studentData.first_name_c || studentData.firstName,
          last_name_c: studentData.last_name_c || studentData.lastName,
          email_c: studentData.email_c || studentData.email,
          phone_c: studentData.phone_c || studentData.phone,
          grade_c: studentData.grade_c || studentData.grade,
          enrollment_date_c: studentData.enrollment_date_c || studentData.enrollmentDate,
          photo_c: studentData.photo_c || studentData.photo,
          address_c: studentData.address_c || studentData.address,
          parent_contact_c: studentData.parent_contact_c || studentData.parentContact,
          status_c: studentData.status_c || studentData.status,
          Tags: studentData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} student records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Student updated successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update student");
    } catch (error) {
      console.error("Error updating student:", error);
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

      const response = await apperClient.deleteRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} student records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Student deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
      return false;
    }
  },

  async search(query) {
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "photo_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "parent_contact_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      if (query) {
        params.whereGroups = [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{"fieldName": "first_name_c", "operator": "Contains", "values": [query]}], "operator": ""},
            {"conditions": [{"fieldName": "last_name_c", "operator": "Contains", "values": [query]}], "operator": ""},
            {"conditions": [{"fieldName": "email_c", "operator": "Contains", "values": [query]}], "operator": ""},
            {"conditions": [{"fieldName": "grade_c", "operator": "Contains", "values": [query]}], "operator": ""}
          ]
        }];
      }

      const response = await apperClient.fetchRecords('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching students:", error);
      toast.error("Failed to search students");
      return [];
    }
  }
};