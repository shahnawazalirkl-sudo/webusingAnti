import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import AddressDialog from './AddressDialog';

const STORAGE_KEY_PROFILE = 'asra_user_profile';
const STORAGE_KEY_ADDRESSES = 'asra_saved_addresses';

const AccountProfile = ({ profile, setProfile, addresses, setAddresses }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(profile);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(profileForm);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileForm));
    } catch (err) {
      console.warn('Error saving profile', err);
    }
    setIsEditingProfile(false);
    toast.success('Profile Dossier updated successfully');
  };

  const handleSaveAddress = (newAddr) => {
    let updated = [...addresses];
    if (editingAddress) {
      // Update existing
      updated = updated.map((a) => (a.id === editingAddress.id ? { ...newAddr, id: a.id } : a));
      if (newAddr.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: a.id === editingAddress.id }));
      }
      toast.success('Address updated successfully');
    } else {
      // Add new
      const addrWithId = {
        ...newAddr,
        id: `addr-${Date.now()}`
      };
      if (addrWithId.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(addrWithId);
      toast.success('New delivery venue saved');
    }

    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error saving addresses', err);
    }
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error removing address', err);
    }
    toast.info('Address removed from address book');
  };

  const handleSetDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error updating default address', err);
    }
    toast.success('Primary dispatch address updated');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
      
      {/* Profile Dossier Card */}
      <Card className="lg:col-span-1 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-lg">person</span>
            <CardTitle className="text-base font-serif font-bold text-on-surface">
              Profile Dossier
            </CardTitle>
          </div>
          {!isEditingProfile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setProfileForm(profile);
                setIsEditingProfile(true);
              }}
              className="gap-1 text-xs text-primary h-8 px-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Edit</span>
            </Button>
          )}
        </div>

        {!isEditingProfile ? (
          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Patron Name</span>
              <span className="font-semibold text-on-surface text-sm">{profile.fullName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Partner / Spouse</span>
              <span className="font-semibold text-on-surface">{profile.partnerName || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Email Address</span>
              <span className="font-semibold text-on-surface">{profile.email}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Contact Phone</span>
              <span className="font-semibold text-on-surface">{profile.phone}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Ceremony Date</span>
              <span className="font-semibold text-primary">{profile.weddingDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-outline block font-medium">Primary Venue</span>
              <span className="font-semibold text-on-surface">{profile.primaryVenue}</span>
            </div>
            <div className="pt-2">
              <span className="text-[10px] uppercase text-outline block font-medium mb-1">Patron Status</span>
              <Badge variant="gold" className="text-[10px] uppercase tracking-wider">
                {profile.vipTier}
              </Badge>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
            <div className="space-y-1">
              <Label htmlFor="prof-name">Full Name</Label>
              <Input
                id="prof-name"
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prof-partner">Partner / Spouse Name</Label>
              <Input
                id="prof-partner"
                value={profileForm.partnerName}
                onChange={(e) => setProfileForm({ ...profileForm, partnerName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prof-email">Email Address</Label>
              <Input
                id="prof-email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prof-phone">Contact Phone</Label>
              <Input
                id="prof-phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prof-date">Ceremony Date</Label>
              <Input
                id="prof-date"
                type="date"
                value={profileForm.weddingDate}
                onChange={(e) => setProfileForm({ ...profileForm, weddingDate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prof-venue">Primary Destination Venue</Label>
              <Input
                id="prof-venue"
                value={profileForm.primaryVenue}
                onChange={(e) => setProfileForm({ ...profileForm, primaryVenue: e.target.value })}
              />
            </div>
            <div className="pt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Dossier
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* Saved Delivery Addresses / Address Book */}
      <Card className="lg:col-span-2 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant/30 pb-4 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <CardTitle className="text-base font-serif font-bold text-on-surface">
                Saved Addresses & Delivery Venues
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant mt-0.5">
              Select default shipping destinations for one-click checkout across your commissions.
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setEditingAddress(null);
              setAddressDialogOpen(true);
            }}
            className="gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Venue / Address</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-primary/60 bg-surface-container-low shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-lowest hover:border-outline'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-on-surface">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <Badge variant="gold" className="text-[9px] uppercase tracking-wider py-0 px-1.5 font-bold">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <p className="font-semibold text-on-surface">{addr.recipient}</p>
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p className="text-outline">Phone: {addr.phone}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                <div>
                  {!addr.isDefault ? (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="p-0 h-auto text-xs"
                    >
                      Make Default
                    </Button>
                  ) : (
                    <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Primary Dispatch
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingAddress(addr);
                      setAddressDialogOpen(true);
                    }}
                    className="h-7 w-7 text-outline hover:text-on-surface"
                    title="Edit address"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </Button>
                  {addresses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="h-7 w-7 text-outline hover:text-error"
                      title="Remove address"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Address Creation/Edit Modal */}
      <AddressDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        onSaveAddress={handleSaveAddress}
        editingAddress={editingAddress}
      />

    </div>
  );
};

export default AccountProfile;
