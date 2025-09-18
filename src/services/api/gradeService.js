import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const gradeService = {
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
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        assignmentName: item.assignment_name_c,
        score: parseFloat(item.score_c) || 0,
        maxScore: parseFloat(item.max_score_c) || 0,
        date: item.date_c,
        category: item.category_c,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades");
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
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('grade_c', parseInt(id), params);
      
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
          assignmentName: item.assignment_name_c,
          score: parseFloat(item.score_c) || 0,
          maxScore: parseFloat(item.max_score_c) || 0,
          date: item.date_c,
          category: item.category_c,
          studentId: item.student_id_c?.Id || item.student_id_c,
          classId: item.class_id_c?.Id || item.class_id_c
        };
      }

      return null;
    } catch (error) {
      console.error(`Error fetching grade ${id}:`, error);
      toast.error("Failed to load grade");
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
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        assignmentName: item.assignment_name_c,
        score: parseFloat(item.score_c) || 0,
        maxScore: parseFloat(item.max_score_c) || 0,
        date: item.date_c,
        category: item.category_c,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching grades by student ID:", error);
      toast.error("Failed to load student grades");
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
          {"field": {"Name": "assignment_name_c"}},
          {"field": {"Name": "score_c"}},
          {"field": {"Name": "max_score_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "class_id_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "class_id_c", "Operator": "EqualTo", "Values": [parseInt(classId)]}],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        assignmentName: item.assignment_name_c,
        score: parseFloat(item.score_c) || 0,
        maxScore: parseFloat(item.max_score_c) || 0,
        date: item.date_c,
        category: item.category_c,
        studentId: item.student_id_c?.Id || item.student_id_c,
        classId: item.class_id_c?.Id || item.class_id_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching grades by class ID:", error);
      toast.error("Failed to load class grades");
      return [];
    }
  },

  async create(gradeData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: gradeData.assignment_name_c || gradeData.assignmentName || "Assignment",
          assignment_name_c: gradeData.assignment_name_c || gradeData.assignmentName,
          score_c: parseFloat(gradeData.score_c || gradeData.score) || 0,
          max_score_c: parseFloat(gradeData.max_score_c || gradeData.maxScore) || 0,
          date_c: gradeData.date_c || gradeData.date || new Date().toISOString().split('T')[0],
          category_c: gradeData.category_c || gradeData.category || "",
          student_id_c: parseInt(gradeData.student_id_c || gradeData.studentId),
          class_id_c: parseInt(gradeData.class_id_c || gradeData.classId),
          Tags: gradeData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} grade records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Grade created successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create grade");
    } catch (error) {
      console.error("Error creating grade:", error);
      throw error;
    }
  },

  async update(id, gradeData) {
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
          Name: gradeData.assignment_name_c || gradeData.assignmentName || "Assignment",
          assignment_name_c: gradeData.assignment_name_c || gradeData.assignmentName,
          score_c: parseFloat(gradeData.score_c || gradeData.score) || 0,
          max_score_c: parseFloat(gradeData.max_score_c || gradeData.maxScore) || 0,
          date_c: gradeData.date_c || gradeData.date,
          category_c: gradeData.category_c || gradeData.category,
          student_id_c: parseInt(gradeData.student_id_c || gradeData.studentId),
          class_id_c: parseInt(gradeData.class_id_c || gradeData.classId),
          Tags: gradeData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} grade records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Grade updated successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update grade");
    } catch (error) {
      console.error("Error updating grade:", error);
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

      const response = await apperClient.deleteRecord('grade_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} grade records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Grade deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting grade:", error);
      toast.error("Failed to delete grade");
      return false;
    }
  }
};