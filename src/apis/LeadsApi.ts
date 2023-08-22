
import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Add other lead properties here
}

export interface LeadDetails {
  // Define the fields for lead details here
}

export interface LeadResponse {
  success: boolean;
  errorMessage?: string;
  leads?: Lead[];
}

export async function getLeads(): Promise<LeadResponse> {
  try {
    const response = await axios.get<Lead[]>(`${BASE_URL}/leads`);
    return { success: true, leads: response.data };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
}

export async function createLead(leadDetails: LeadDetails): Promise<LeadResponse> {
  try {
    const response = await axios.post<Lead>(`${BASE_URL}/leads`, leadDetails);
    return { success: true, leads: [response.data] };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
}

export async function updateLead(leadId: number, leadDetails: LeadDetails): Promise<LeadResponse> {
  try {
    const response = await axios.put<Lead>(`${BASE_URL}/leads/${leadId}`, leadDetails);
    return { success: true, leads: [response.data] };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
}

export async function deleteLead(leadId: number): Promise<LeadResponse> {
  try {
    await axios.delete(`${BASE_URL}/leads/${leadId}`);
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: error.message };
  }
}