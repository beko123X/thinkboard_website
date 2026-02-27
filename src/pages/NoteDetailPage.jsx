import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id);

  useEffect(()=> 
  {
    const fetchNote = async()=>
    {
      try 
      {
        const res = await api.get(`/notes/${id}`);
        console.log(res.data);
        setNote(res.data); 
        
      } 
      catch (error)
      {  
        console.log(`Error in fetching note ${error}`);
        toast.error("Failed to Fetch the Note");
        
      }finally
      {
        setLoading(false);
      }
    };
    fetchNote()

  }, [id]);

  const handleDelete = async ()=>
  {
    if (!window.confirm("Are You Sure Want To Delete This Note ? ")) return;

    try 
    {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully :👌 ");
      navigate('/')
    } catch (error) 
    {
      console.log(`Error Deleting The Note : ${error}`);
      toast.error('Failed To Delete Note');  
    }
  };

  const handleSave = async()=>
  {
    if(!note.title.trim() || !note.content.trim())
    {
      toast.error('Please Add a Title or Content :🤦 ');
      return;
    }

    setSaving(true);

    try 
    {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Update Successfully:👌 ");
      navigate('/');
    } catch (error) 
    {
      console.log(`Error Saving The Note: ${error}`);
      toast.error('Failed to Update Note');
      
    } finally
    {
      setSaving(false);
    }
  }


  if(loading) 
  {
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
           <div className='flex items-center mx-auto justify-between mb-6'>
              <Link to={'/'} className='btn btn-ghost'>
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
              </Link>
              <button onClick={handleDelete} className='btn btn-error btn-outline' >
                <Trash2Icon className='size-5' />
                Delete Note
              </button>
            </div>

          <div className="card bg-base-100">
            <div className='card-body'>
              {/* Title Creation */}
              <div className='form-control mb-4'>
                <label className="label">
                    <span className='label-text'>Title</span>
                </label>
                <input 
                    type="text"
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={note.title}
                    onChange={(e)=> setNote({...note,title:e.target.value})} 
                />
              </div>

              {/* Content Creation */}
              <div className='form-control mb-4'>
                  <label className="label">
                      <span className='label-text'>Content</span>
                  </label>
                  <textarea 
                      placeholder='Wire Your Note Herer....'
                      className='textarea textarea-bordered h-32'
                      value={note.content}
                      onChange={(e)=> setNote({...note, content:e.target.value})} 
                  />
              </div>

              <div className="card-actions justify-end">
                <button onClick={handleSave} className='btn btn-primary' disabled={saving}>
                  {saving ? "Saving" : "Save Changes"}
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}


export default NoteDetailPage



