
import React from 'react';
import { Check, Edit, X } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type UserAction = 'approve' | 'modify' | 'revoke' | null;

interface UserActionToggleProps {
  value: UserAction;
  onValueChange: (value: UserAction) => void;
  className?: string;
  size?: 'sm' | 'default';
}

const UserActionToggle = ({ value, onValueChange, className, size = 'default' }: UserActionToggleProps) => {
  // Handle single toggle selection
  const handleValueChange = (newValue: string) => {
    // If the same value is clicked again, deselect it
    if (newValue === value) {
      onValueChange(null);
    } else {
      onValueChange(newValue as UserAction);
    }
  };

  const buttonSize = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <ToggleGroup 
      type="single" 
      value={value || ''} 
      onValueChange={handleValueChange}
      className={cn("justify-end", className)}
    >
      <ToggleGroupItem 
        value="approve" 
        aria-label="Approve access"
        className={cn(
          `${buttonSize} p-0 data-[state=on]:bg-green-500 data-[state=on]:text-white data-[state=on]:border-green-500 hover:bg-green-100 rounded-full`,
          value === 'approve' ? "text-white" : "text-green-500"
        )}
      >
        <Check className={iconSize} />
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="modify" 
        aria-label="Modify access"
        className={cn(
          `${buttonSize} p-0 data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500 hover:bg-blue-100 rounded-full`,
          value === 'modify' ? "text-white" : "text-blue-500"
        )}
      >
        <Edit className={iconSize} />
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="revoke" 
        aria-label="Revoke access"
        className={cn(
          `${buttonSize} p-0 data-[state=on]:bg-red-500 data-[state=on]:text-white data-[state=on]:border-red-500 hover:bg-red-100 rounded-full`,
          value === 'revoke' ? "text-white" : "text-red-500"
        )}
      >
        <X className={iconSize} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default UserActionToggle;
