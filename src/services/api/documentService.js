import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const documentService = {
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "upload_date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('document_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        title: item.title_c,
        type: item.type_c,
        uploadDate: item.upload_date_c,
        fileUrl: item.file_url_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}},
          {"field": {"Name": "Tags"}}
        ]
      };

      const response = await apperClient.getRecordById('document_c', parseInt(id), params);
      
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
          title: item.title_c,
          type: item.type_c,
          uploadDate: item.upload_date_c,
          fileUrl: item.file_url_c
        };
      }

      return null;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      toast.error("Failed to load document");
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "upload_date_c"}},
          {"field": {"Name": "file_url_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{"FieldName": "student_id_c", "Operator": "EqualTo", "Values": [parseInt(studentId)]}],
        orderBy: [{"fieldName": "upload_date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('document_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match expected format
      const transformedData = (response.data || []).map(item => ({
        ...item,
        studentId: item.student_id_c?.Id || item.student_id_c,
        title: item.title_c,
        type: item.type_c,
        uploadDate: item.upload_date_c,
        fileUrl: item.file_url_c
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching documents by student ID:", error);
      toast.error("Failed to load student documents");
      return [];
    }
  },

  async create(documentData) {
    await delay(400);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: documentData.title_c || documentData.title || "Document",
          student_id_c: parseInt(documentData.student_id_c || documentData.studentId),
          title_c: documentData.title_c || documentData.title,
          type_c: documentData.type_c || documentData.type,
          upload_date_c: documentData.upload_date_c || documentData.uploadDate || new Date().toISOString().split('T')[0],
          file_url_c: documentData.file_url_c || documentData.fileUrl || "",
          Tags: documentData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord('document_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} document records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Document created successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create document");
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  async update(id, documentData) {
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
          Name: documentData.title_c || documentData.title || "Document",
          student_id_c: parseInt(documentData.student_id_c || documentData.studentId),
          title_c: documentData.title_c || documentData.title,
          type_c: documentData.type_c || documentData.type,
          upload_date_c: documentData.upload_date_c || documentData.uploadDate,
          file_url_c: documentData.file_url_c || documentData.fileUrl,
          Tags: documentData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord('document_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} document records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Document updated successfully");
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update document");
    } catch (error) {
      console.error("Error updating document:", error);
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

      const response = await apperClient.deleteRecord('document_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} document records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Document deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
      return false;
    }
  }
};